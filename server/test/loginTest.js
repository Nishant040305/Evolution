const express = require("express")
const router = express.Router();

router.post('/signup',async(req,res)=>{
    console.log(req.body);
    return res.status(200).json({AUTH:123})
})
router.post('/otpver',async(req,res)=>{
    console.log(req.body)
    if(req.body.OTP==100000){
        return res.status(200).json({sucess:true})
    }else{
        return res.status(400).json({message:"Invalid OTP"})
    }
})
router.post('/login',async(req,res)=>{
    if(req.body.EMAIL=="nishant040305@gmail.com"&&req.body.PASSWORD=="000000"){
        return res.status(200).json({success:true})
    }
    return res.status(400).json({success:false})
})
router.post('/forget',async(req,res)=>{
    if(req.body.EMAIL=="nishant040305@gmail.com"){
        return res.status(200).json({success:true})
    }else{
        return res.status(404).json({msg:"user does not Exist"})
    }
})
router.post('/confirChange',async(req,res)=>{
    if(req.body.AUTHENTICATION=="XYZ"){
        return res.status(200).json({msg:"password changed"})
    }else{
        return res.status(400).json({success:false})
    }
})
router.post('/resend',async(req,res)=>{
    return res.status(200).json({success:true})
})
module.exports = router;