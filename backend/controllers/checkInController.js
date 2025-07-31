import { detectCheating } from "../helper/detectCheating.js";
import { Challenge } from "../models/challenge.js";
import { CheckIn } from "../models/checkIn.js";
import cloudinary from  '../config/cloudinary.js'

export const checkInToday = async (req, res) => {
  try {
    const { comment } = req.body;

    const challenge = await Challenge.findById(req.params.challengeid);

    if (!challenge) {
      return res.status(404).json({ msg: "challenge not found" });
    }

    const now = new Date();

    const participant = challenge.participants.find(p => p.userId && p.userId.toString() === req.user.id)

    console.log("Challenge participants:", challenge.participants);
console.log("Logged-in user:", req.user.id);

      if (!participant) return res.status(400).json({ error: 'Not part of this challenge' });

  

      const alreadyCheckedIn = await CheckIn.findOne({
    user: req.user.id,
    challenge: challenge._id,
    timestamp: {
      $gte: new Date(new Date().setHours(0,0,0,0)), // today
      $lt: new Date(new Date().setHours(23,59,59,999))
    }
});
if (alreadyCheckedIn) {
    return res.status(400).json({ error: "Already checked in today" });
}

const lastCheckIn = await checkIn.findOne({user:req.user.id, challenge:challenge._id}).sort({timestamp:-1})
    if (lastCheckIn) {
      const diffInHours = (now - lastCheckIn.timestamp) / (1000 * 60 * 60);
      if (diffInHours > 24) participant.streak = 0; 
    }


   let photoUrl = ""
   if(req.file){
   const result = await new Promise((resolve,reject)=>{
   const stream = cloudinary.uploader.upload_stream(
      {folder:"checkins"},
      (error,result )=>{
        if(error )reject(error);
        else resolve (result)
      }
  )
    stream.end(req.file.buffer)
   })
  photoUrl = result.secure_url
   }

    // Check cheating
    const { isLate, penalty } = detectCheating(now, challenge);

    const checkIn = new CheckIn({
      user: req.user.id,
      challenge: challenge._id, 
      timestamp: now,
      comment,
      photoUrl,
      isLate,
      trustPenalty: penalty
    });
   await checkIn.save()

      if(isLate){
        participant.lateCount++;
        participant.streak++;
        participant.totalPoints +=5;
      }else{
        participant.streak++;
        participant.totalPoints +=10;
      }
     
      await challenge.save()
    return res.status(200).json({
      msg: "check-in submitted successfully",
      checkIn
    });
  } catch (err) {
    return res.status(500).json({ msg: "error while checkin", error: err.message });
  }
};
