const express = require('express');
const router = express.Router();
const credController = require("../controller/credControllers");
const credMiddleware = require('../middleware/credMiddleware');

router.post('/signin',credController.Signin);
router.post('/OTPverification',credController.VerifyUser);
router.post('/login',credController.LogIn);
router.post('/forgetPassword',credController.PasswordRecovery);
router.post('/passwordChange',credController.ConfirmPasswordChange);
module.exports = router;