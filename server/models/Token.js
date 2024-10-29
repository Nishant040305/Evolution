const mongoose = require("mongoose");
const {Schema} = mongoose;

const tokenSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    token:{
        type:String,
        required:true
    },
    type:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:300
    }
    });

module.exports  = mongoose.model("token",tokenSchema);