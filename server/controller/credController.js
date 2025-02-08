//Utility Functions
const {
  sendOtpEmail,
  sendPasswordRecoverEmail,
} = require('../utils/SendEmail');
const { generateOTP, UserNameParse } = require('../utils/index');

//Models
const User = require('../models/User');
const Token = require('../models/Token');

//services
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const jwtToken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//Sign In
const Signin = async (req, res) => {
  let user = await User.findOne({ email: req.body.EMAIL });
  if (!user) {
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.PASSWORD, salt);
    const hashedUsername = await UserNameParse(req.body.EMAIL);
    user = await new User({
      displayname: hashedUsername,
      email: req.body.EMAIL,
      password: hashPassword,
      verify: false,
      name: hashedUsername,
    }).save();
    const otp = generateOTP();

    const token = await new Token({
      userId: user._id,
      token: otp,
      email: user.email,
      type: 'EmailVerification',
    }).save();
    await sendOtpEmail(user.email, otp);
    return res.status(200).json({
      message: 'An Email sent to your account please verify',
      AUTH: token._id,
    });
  } else if (!user.verify) {
    const tok = await Token.findOne({ userId: user._id });
    if (tok && tok.type == 'EmailVerification') {
      await sendOtpEmail(user.email, tok.token);
      return res.status(200).json({
        message: 'An Email sent to your account please verify',
        AUTH: tok._id,
      });
    }

    const _ = generateOTP();

    const token = await new Token({
      userId: user._id,
      token: _,
      email: user.email,
      type: 'EmailVerification',
    }).save();
    await sendOtpEmail(user.email, _);

    return res.status(200).json({
      message: 'An Email sent to your account please verify',
      AUTH: token._id,
    });
  }
  return res.status(400).json({ message: 'User All ready Exist' });
};

const VerifyUser = async (req, res) => {
  try {
    const token_ = await Token.findById(req.body.AUTHENTICATION);
    if (!token_) return res.status(400).json({ message: 'OTP Expiered' });

    const token = await Token.findOne({
      _id: token_._id,
      token: req.body.OTP,
    });
    if (!token)
      return res.status(400).json({ message: 'OTP Expired or invalid' });
    if (token.type == 'PasswordChangeOTP') {
      const PasswordUpdateToken = await new Token({
        userId: token_.userId,
        token: 0,
        email: token_.email,
        type: 'PasswordChange',
        //expiring time
      }).save();
      return res.status(200).json({ AUTH: PasswordUpdateToken._id });
    } else if (!token && token.type != 'EmailVerification')
      return res.status(400).json({ message: 'OTP Expired' });

    const userUpdate = await User.findOneAndUpdate(
      { _id: token_.userId },
      { verify: true },
      { new: true }
    ).lean();
    delete userUpdate.password;
    delete userUpdate.verify;
    const jwtData = jwtToken.sign(userUpdate, process.env.JWTSECREAT);
    res.cookie('uid', jwtData, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return res
      .status(200)
      .json({ _id: userUpdate, message: 'Email verified successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
const LogIn = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.EMAIL }).lean();
    if (user.password == null) {
      return res
        .status(400)
        .json({ error: 'please try to login with correct credentials' });
    }
    const passwordCompare = await bcrypt.compare(
      req.body.PASSWORD,
      user.password
    );
    if (!user.verify) {
      return res
        .status(400)
        .json({ error: 'please try to login with correct credentials' });
    }
    if (!passwordCompare) {
      return res
        .status(400)
        .json({ error: 'please try to login with correct credentials' });
    }
    delete user.password;
    delete user.verify;
    delete user.contribution;
    delete user.projects;
    delete user.sharedProjects;
    console.log('LOGIN', user);
    const jwtData = jwtToken.sign(user, process.env.JWTSECREAT);
    res.cookie('uid', jwtData, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.status(200).json({ info: { ...user }, message: 'Login successful' });
  } catch (e) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const PasswordRecovery = async (req, res) => {
  try {
    const { EMAIL } = req.body;
    console.log(EMAIL);
    const user = await User.findOne({ email: EMAIL });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otp = generateOTP();
    const newToken = await Token.create({
      userId: user._id,
      token: otp,
      type: 'PasswordChangeOTP',
      email: EMAIL,
    });

    sendPasswordRecoverEmail(EMAIL, otp);

    return res
      .status(200)
      .json({ type: 'PasswordChangeOTP', AUTH: newToken._id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const ConfirmPasswordChange = async (req, res) => {
  try {
    const { AUTHENTICATION, PASSWORD } = req.body;
    console.log(AUTHENTICATION, PASSWORD);
    const token = await Token.findOne({
      _id: AUTHENTICATION,
      type: 'PasswordChange',
    });
    console.log(token);
    if (!token) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const user = await User.findById(token.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(PASSWORD, salt);

    user.password = hashedPassword;
    await user.save();

    await Token.findByIdAndDelete(token._id);
    delete user.password;
    delete user.verify;
    const data = {
      displayname: user.displayname,
      _id: user._id,
      email: user.email,
      projects: user.projects,
      avatar: user.avatar,
    };
    const jwtData = jwtToken.sign(data, process.env.JWTSECREAT);
    res.cookie('uid', jwtData, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return res
      .status(200)
      .json({ info: { ...data }, message: 'Password updated successfully' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
// Logout route
const logout = (req, res) => {
  // Clear the 'uid' cookie
  res.clearCookie('uid', { httpOnly: true, secure: true, sameSite: 'none' });
  res.status(200).send({ message: 'Logged out successfully' });
};
module.exports = {
  Signin,
  LogIn,
  VerifyUser,
  PasswordRecovery,
  ConfirmPasswordChange,
  logout,
};
