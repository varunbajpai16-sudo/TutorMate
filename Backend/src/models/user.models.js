import mongoose from "mongoose"

const userSchema  = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    avater:{
        type:string,
    },
    role:{
        type:String,
        required:true,
    }

},{timestamps:true})


export const User = mongoose.model("User",userSchema);