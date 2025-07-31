import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    password:String,
    trustScore: { type: Number, default: 100 },
    joinedChallenges:[{type:mongoose.Schema.Types.ObjectId, ref:"Challenge"}]
},{timestamps:true})

export const User = mongoose.model("User",userSchema)