const {sendOtpEmail,sendPasswordRecoverEmail} = require("../utils/SendEmail");
const express = require("express")
const router = express.Router();

//otp
router.post('/mailTest',async(req,res)=>{
    sendOtpEmail("nishant040305@gmail.com","123333");
    sendPasswordRecoverEmail("nishant040305@gmail.com","123333")

    return res.status(200).json({});
})

module.exports = router;