import { Challenge } from "../models/challenge.js";
import { User } from "../models/User.js";

export const createChallenge = async(req,res) =>{
    try{
     const {title,description ,habitType,durationDays} = req.body;
     const start = new Date()
     const end = new Date()

     end.setDate(start.getDate() + durationDays)
     
     const challenge =await Challenge.create({
       title,
       description,
       habitType,
       creator:req.user.id,
       participants:
       [{
       userId: req.user.id,
        streak: 0,
    totalPoints: 0,
    lateCount: 0,
    missedCount: 0,
    status: 'accepted'

     }],
       durationDays,
       startDate:start,
       endDate:end,
     }) 

     return res.status(200).json(challenge)
     
    }catch(err){
     return res.status(500).json({msg:'error while creating challenge',err:err.message})
    }
}

export const joinChallenge = async(req,res) =>{
    try{
     const challenge = await Challenge.findById(req.params.id)

     if(!challenge){
      return res.status(404).json({msg:'challenge not found'})
     }

     const alreadyJoined = challenge.participants.some(p => p.userId.toString() === req.user.id)
     if(alreadyJoined){
       return res.status(400).json({msg:'already joined'})
     }
     
     challenge.participants.push({
      userId: req.user.id,
  streak: 0,
  totalPoints: 0,
  lateCount: 0,
  missedCount: 0,
  status: 'accepted'
     })
     await challenge.save()

     await User.findByIdAndUpdate(req.user.id,{$addToSet:{joinedChallenges:req.params.id},})
     res.json({ msg: 'Joined challenge' ,challenge});
    }catch(err){
      return res.status(500).json({msg:'error while joining challenge',err:err.message})

    }
}

export const getMyChallenges = async(req,res) =>{
    try{
    const challenge = await Challenge.find({"participants.userId":req.user.id});

    res.status(200).json({challenge})
    }catch(err){
     return res.status(500).json({msg:'error while getting challenge'})
    }
}

export const getAllChallenges = async(req,res) =>{
  try{
 const challenges = await Challenge.find().populate("creator", "name").populate("participants.userId", "name")

 if(challenges.length == 0){
   return res.status(404).json({ msg: "No challenges found" });
 }
  res.status(200).json(challenges);
  }catch(err){
    return res.status(500).json({err:err.message})
  }
}

export const getLeaderBoard = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id).populate("participants.userId", "name");
    if (!challenge) {
      return res.status(404).json({ msg: 'Could not find any challenge' });
    }

    let sortedParticipants = challenge.participants
      .filter(p => p.userId && p.status === 'accepted')
      .sort((a, b) => b.totalPoints - a.totalPoints);

    const leaderboard = sortedParticipants.map((p, index) => {
      let badge = "Bronze";
      if (index === 0) badge = "Platinum";
      else if (index === 1) badge = "Gold";
      else if (index === 2) badge = "Silver";

      let nextGoal = "Already At Top";
      if (index === 1) {
        nextGoal = `${sortedParticipants[0].totalPoints - p.totalPoints} points to reach Platinum`;
      } else if (index === 2) {
        nextGoal = `${sortedParticipants[1].totalPoints - p.totalPoints} points to reach Gold`;
      } else if (index >= 3 && sortedParticipants.length > 2) {
        nextGoal = `${sortedParticipants[2].totalPoints - p.totalPoints} points to reach Silver`;
      }

      return {
        name: p.userId.name,
        streak: p.streak,
        totalPoints: p.totalPoints,
        lateCount: p.lateCount,
        missedCount: p.missedCount,
        badge,
        nextGoal
      };
    });

    res.status(200).json(leaderboard);
  } catch (err) {
    return res.status(500).json({ err: "Error while getting leaderboard", msg: err.message });
  }
};

export const getAllLeaderboard = async (req, res) => {
  try {
    const challenges = await Challenge.find()
      .populate("participants.userId", "name");

    let allParticipants = []; // ✅ changed to let

    challenges.forEach(challenge => {
      const acceptedParticipants = challenge.participants.filter(
        p => p.userId && p.status === 'accepted'
      );
      allParticipants.push(...acceptedParticipants); // ✅ push instead of reassign
    });

    if (allParticipants.length === 0) {
      return res.status(404).json({ msg: "No participants found" }); // ✅ fixed .json
    }

    allParticipants.sort((a, b) => b.totalPoints - a.totalPoints);

    const uniqueLeaders = [];
    const seenUsers = new Set();

    for (let p of allParticipants) {
      if (!seenUsers.has(p.userId._id.toString())) {
        seenUsers.add(p.userId._id.toString());
        uniqueLeaders.push(p);
      }
    }

    const leaderboard = uniqueLeaders.map((p, i) => {
      let badge = "Bronze";
      if (i === 0) badge = "Platinum";
      if (i === 1) badge = "Gold";
      if (i === 2) badge = "Silver";

      return {
        rank: i + 1,
        name: p.userId.name,
        streak: p.streak,
        totalPoints: p.totalPoints,
        lateCount: p.lateCount,
        missedCount: p.missedCount,
        badge
      };
    });

    res.status(200).json(leaderboard);

  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};


export const inviteByUsername = async(req,res)=>{
  try{
    const {username} = req.body;
    const user = await User.findOne({name:username});
    if(!user){
      return res.status(400).json({msg:'user not found'})
    }
    
    const challengeId = req.params.challengeid
    const challenge = await Challenge.findById(challengeId)
    if(!challenge){
      return res.status(404).json({ msg: "Challenge not found" });
    }
    const alreadyJoined = challenge.participants.some(p =>(p.userId.toString() === user._id.toString()))
    if(alreadyJoined){
      return res.status(400).json({msg:'user is already in a challenge'})
    }

    challenge.participants.push({
       userId: user._id,
  streak: 0,
  totalPoints: 0,
  lateCount: 0,
  missedCount: 0,
  status:'pending'
    })
    await User.findByIdAndUpdate(user._id,{
      $addToSet:{joinedChallenges:challenge._id}
    })
    await challenge.save()
    res.json({msg:`${username} invited`})

  }catch(err){
    return res.status(500).json({err:err.message})
  }
}