import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema({

    title:String,
    description:String,
    habitType:String,
    creator:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    participants:[{
        userId:  {type:mongoose.Schema.Types.ObjectId, ref:'User'},
        streak:{type:Number, default:0},
        totalPoints:{type:Number, default:0},
        lateCount:{type:Number, default:0},
        missedCount:{type:Number,default:0},
        status:{type:String,
            enum: ['pending', 'accepted', 'rejected'],
            default:'pending'}
    }],
    durationDays:Number,
    startDate:Date,
    endDate:Date

},{timestamps:true})

export const Challenge = mongoose.model("Challenge",challengeSchema)