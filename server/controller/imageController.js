const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const {ImageUpload} = require("../utils/ImageUpload");


const ImageUploadProject=async(req,res)=>{
    const file = req.file;
    const result = await ImageUpload(file);
    if(result.message!="OK"){
        return res.status(400).json(result);
    }else{
        return res.status(200).json(result);
    }
}

module.exports = {ImageUploadProject};