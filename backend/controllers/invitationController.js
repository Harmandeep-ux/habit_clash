import { Challenge } from "../models/challenge.js"
import { User } from "../models/User.js"

export const acceptInvite = async(req,res)=>{
    try{
     const challenge = await Challenge.findById(req.params.challengeid)
     if(!challenge) return res.status(404).json({msg:"not found "})

      const participant = challenge.participants.find(
            p=> p.userId.toString() == req.user.id && p.status == 'pending'
        )
        if(!participant) return res.status(404).json({msg:"no pending invite"})

            participant.status = 'accepted'
            await challenge.save()

            await User.findByIdAndUpdate(req.user.id ,{
                $addToSet:{joinedChallenges:challenge._id}
            })

            return res.json('invite accepted')
    }catch(err){
        return res.status(500).json({err:err.message})
    }
}

export const rejectInvite = async(req,res)=>{
    try{
     const challenge = await Challenge.findById(req.params.challengeid)
     if(!challenge){
        return res.status(404).json({msg:"challenge not found"})
     }

     challenge.participants.filter(p =>!(p.userId.toString()=== req.user.id && p.status === 'pending'))
     await challenge.save()
    }catch(err){
        return res.status(500).json({err:err.message})
    }
}

export const pendingInvites = async(req,res)=>{
    try{
     const challenge = await Challenge.find({
        "participants.userId":req.user.id,
        "participants.status": "pending",
     })
     return res.json(challenge)
    }catch(err){
        return res.status(500).json({err:err.message})
    }
}