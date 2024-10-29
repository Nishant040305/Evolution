//Utility Functions
const {sendOtpEmail,sendPasswordRecoverEmail,} = require("../utils/SendEmail");
const { generateOTP, UserNameParse } = require("../utils/index");

//Models
const User = require("../models/User");
const Token = require("../models/Token");

//services
const jwtToken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Sign In
const Signin = async (req, res) => {
  let user = await User.findOne({ email: req.body.EMAIL });
  if (!user) {
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.PASSWORD, salt);

    user = await new User({ displayname:UserNameParse(req.body.Email),email: req.body.EMAIL, password: hashPassword ,verify:false}).save();
    const otp = generateOTP();

    const token = await new Token({
      userId: user._id,
      token: otp,
      email: user.email,
      type: "EmailVerification"
    }).save();
    await sendOtpEmail(user.email,otp);
    return res.status(200).json({ message: "An Email sent to your account please verify",AUTH:token._id  });
    } 
    else if (!user.verify) {
    const tok = await Token.findOne({ userId: user._id });
    if (tok && tok.type == "EmailVerification") {
      await sendOtpEmail(user.email,tok.token);
      return res.status(200).json({ message: "An Email sent to your account please verify",AUTH:tok._id });
    }

    const _ = generateOTP();

    const token = await new Token({
      userId: user._id,
      token: _,
      email: user.email,
      info: {
        message: "EmailVerification",
      },
    }).save();
    await sendOtpEmail(user.email,_);

    return res.status(200).json({ message: "An Email sent to your account please verify",AUTH:token._id });
  }
  return res.status(400).json({ message: "User All ready Exist" });
};

const VerifyUser = async(req,res)=>{
    try {
          const user = await Token.findOne({ _id: req.body.AUTHENTICATION });
          if (!user) return res.status(400).json({ message: "OTP Expiered" });

          const token = await Token.findOne({
              userId: user._id,
              token: req.body.OTP,
          });
          if (!token&&token.type!="EmailVerification") return res.status(400).json({ message: "Invalid" });
      const userUpdate= await User.findOneAndUpdate({ _id: user._id},{ verify: true},{new:true});
      delete userUpdate.password;
      const jwtData = jwtToken.sign(userUpdate,process.env.JWTSECREAT)
      res.cookie('uid', jwtData, { httpOnly: true, secure: true, sameSite: 'Strict' });
          return res.status(200).json({_id:userUpdate._id, message: "Email verified successfully" });
      } catch (error) {
      console.log(error)
          return res.status(500).json({ message: "Internal Server Error" });
      }
  }
const LogIn = async(req,res)=>{
    try{
      let user = await User.findOne({email:req.body.EMAIL});
      const passwordCompare = await bcrypt.compare(req.body.PASSWORD,user._doc.password);
      if(!user.verify){
        return res.status(400).json({error:"please try to login with correct credentials"})
      }
      if(!passwordCompare){
        return res.status(400).json({error:"please try to login with correct credentials"})
      }
      delete user._doc.password;
      const jwtData = jwtToken.sign({...user._doc},process.env.jwt_secreat)
      res.cookie('uid', jwtData, { httpOnly: true, secure: true, sameSite: 'Strict' });
          res.status(200).json({info:{...user._doc}, message: "Login successful" });
    }catch(e){
      res.status(500).json({message:'Internal Server Error'});
    }
  }
const PasswordRecovery = async(req,res)=>{
    try{

    }catch(e){
        return res.status(500).json({message:"Internal Server Error"})
    }
}

module.exports = {Signin,LogIn,VerifyUser};