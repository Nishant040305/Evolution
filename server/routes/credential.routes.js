const express = require('express');
const router = express.Router();
const credController = require("../controller/credControllers");
const credMiddleware = require('../middleware/credMiddleware');

router.post('/signin',credController.Sigin);
router.post('/OTPverification',credController.VerifyUser);
router.post('/login',credController.LogIn);

module.exports = router;