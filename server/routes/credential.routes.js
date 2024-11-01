const express = require('express');
const router = express.Router();
const credController = require("../controller/credController");
const credMiddleware = require("../middleware/credMiddleware")
router.get('/',credMiddleware.UserVerifier,async(req,res)=>{
    return res.status(200).json({info:req.user})
  })
router.post('/signin',credController.Signin);
router.post('/OTPverification',credController.VerifyUser);
router.post('/login',credController.LogIn);
router.post('/forgetPassword',credController.PasswordRecovery);
router.post('/passwordChange',credController.ConfirmPasswordChange);

module.exports = router;