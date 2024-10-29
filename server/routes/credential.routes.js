const express = require('express');
const router = express.Router();
const { credController } = require("../controller");

router.post('/signin', credController.Signin);
router.post('/OTPverification', credController.VerifyUser);
router.post('/login', credController.LogIn);

module.exports = router;