//Utility Functions
const { sendOtpEmail, sendPasswordRecoverEmail, } = require("../utils/SendEmail");
const { generateOTP, UserNameParse } = require("../utils/index");

//Models
const User = require("../models/User");
const Token = require("../models/Token");

//services
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const jwtToken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Sign In
const Signin = async (req, res) => {
  let user = await User.findOne({ email: req.body.EMAIL });
  if (!user) {
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.PASSWORD, salt);

    user = await new User({ displayname: UserNameParse(req.body.EMAIL), email: req.body.EMAIL, password: hashPassword, verify: false }).save();
    const otp = generateOTP();

    const token = await new Token({
      userId: user._id,
      token: otp,
      email: user.email,
      type: "EmailVerification"
    }).save();
    await sendOtpEmail(user.email, otp);
    return res.status(200).json({ message: "An Email sent to your account please verify", AUTH: token._id });
  }
  else if (!user.verify) {
    const tok = await Token.findOne({ userId: user._id });
    if (tok && tok.type == "EmailVerification") {
      await sendOtpEmail(user.email, tok.token);
      return res.status(200).json({ message: "An Email sent to your account please verify", AUTH: tok._id });
    }

    const _ = generateOTP();

    const token = await new Token({
      userId: user._id,
      token: _,
      email: user.email,
      type: "EmailVerification",
    }).save();
    await sendOtpEmail(user.email, _);

    return res.status(200).json({ message: "An Email sent to your account please verify", AUTH: token._id });
  }
  return res.status(400).json({ message: "User All ready Exist" });
};

const VerifyUser = async (req, res) => {
  try {
    const user = await Token.findById(req.body.AUTHENTICATION);
    if (!user) return res.status(400).json({ message: "OTP Expiered" });

    const token = await Token.findOne({
      _id: user._id,
      token: req.body.OTP,
    });
    if (!token && token.type == "PasswordChangeOTP") {
      const PasswordUpdateToken = await new Token({
        userId: user._id,
        token: 0,
        type: "PasswordChange"
        //expiring time
      }).save();
      return res.status(200).json({ AUTH: PasswordUpdateToken._id })

    }
    else if (!token && token.type != "EmailVerification") return res.status(400).json({ message: "OTP Expired" })

    const userUpdate = await User.findOneAndUpdate({ _id: user.userId }, { verify: true }, { new: true }).lean();
    delete userUpdate.password;
    delete userUpdate.verify;
    const jwtData = jwtToken.sign(userUpdate, process.env.JWTSECREAT)
    res.cookie('uid', jwtData, { httpOnly: true, secure: true, sameSite: 'Strict' });
    return res.status(200).json({ _id: userUpdate, message: "Email verified successfully" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
const LogIn = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.EMAIL }).lean();
    const passwordCompare = await bcrypt.compare(req.body.PASSWORD, user.password);
    if (!user.verify) {
      return res.status(400).json({ error: "please try to login with correct credentials" })
    }
    if (!passwordCompare) {
      return res.status(400).json({ error: "please try to login with correct credentials" })
    }
    delete user.password;
    delete user.verify;
    const jwtData = jwtToken.sign(user, process.env.JWTSECREAT)
    res.cookie('uid', jwtData, { httpOnly: true, secure: true, sameSite: 'Strict' });
    res.status(200).json({ info: { ...user }, message: "Login successful" });
  } catch (e) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
const PasswordRecovery = async (req, res) => {
  try {
    const { EMAIL } = req.body;

    const user = await User.findOne({ email: EMAIL });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = generateOTP();
    const newToken = await Token.create({
      userId: user._id,
      token: otp,
      type: "PasswordChangeOTP",
      email: EMAIL,
    });

    sendPasswordRecoverEmail(EMAIL, otp);

    return res.status(200).json({ type: "PasswordChangeOTP", tokenId: newToken._id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const ConfirmPasswordChange = async (req, res) => {
  try {
    const { AUTHENTICATION, PASSWORD } = req.body;

    const token = await Token.findOne({ _id: AUTHENTICATION, type: "PasswordChangeOTP" });
    if (!token) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const user = await User.findById(token.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(PASSWORD, salt);

    user.password = hashedPassword;
    await user.save();

    await Token.findByIdAndDelete(token._id);

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = { Signin, LogIn, VerifyUser,PasswordRecovery,ConfirmPasswordChange };