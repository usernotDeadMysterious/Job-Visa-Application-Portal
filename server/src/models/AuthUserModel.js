
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AuthUserSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    hasActiveAccess:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        default:'STUDENT'
    }

})

const AuthUserModel = mongoose.model('authuser',AuthUserSchema);

export {AuthUserModel}