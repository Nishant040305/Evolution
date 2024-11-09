const express = require('express');
const router = express.Router();
const credController = require("../controller/credController");
const credMiddleware = require("../middleware/credMiddleware");
const User = require('../models/User');

// @routes   GET /api/auth/
// @desc     Get current user info
router.get('/', credMiddleware.UserVerifier, async (req, res) => {
    const user = await User.findById(req.user._id);
    return res.status(200).json({ info: user });
});

// @routes   POST /api/auth/signin
// @desc     Sign in user and send OTP
router.post('/signin', credController.Signin);

// @routes   POST /api/auth/OTPverification
// @desc     Verify user's email with OTP
router.post('/OTPverification', credController.VerifyUser);

// @routes   POST /api/auth/login
// @desc     Log in user
router.post('/login', credController.LogIn);

// @routes   POST /api/auth/forgetPassword
// @desc     Initiate password recovery
router.post('/forgetPassword', credController.PasswordRecovery);

// @routes   POST /api/auth/passwordChange
// @desc     Change user's password
router.post('/passwordChange', credController.ConfirmPasswordChange);

// @routes   POST /api/auth/logout
// @desc     Logout user
router.post('/logout', credController.logout);
module.exports = router;
