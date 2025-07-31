import mongoose from "mongoose";

const checkInSchema = new mongoose.Schema({
    
    user:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    challenge:{type:mongoose.Schema.Types.ObjectId, ref:"Challenge" }, 
    timestamp:Date,
    comment:String,
    photoUrl:String,
    isLate:Boolean,
    trustPenalty:Number
},{timestamps:true})

export const CheckIn = mongoose.model("CheckIn",checkInSchema)