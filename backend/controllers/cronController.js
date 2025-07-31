import cron from 'node-cron'
import nodemailer from 'nodemailer'
import { Challenge } from '../models/challenge.js'
import { CheckIn } from '../models/checkIn.js'

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS  
  }
});

const sendEmailReminder = async (email, challengeTitle) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Daily Challenge Reminder",
      text: `Don't forget to check in for your challenge: ${challengeTitle}`
    });
    console.log(`Reminder sent to ${email}`);
  } catch (err) {
    console.error("Email send error:", err.message);
  }
};

cron.schedule("59 23 * * *", async () => {
  console.log("⏳ Running streak reset job...");
  try {
    const challenges = await Challenge.find().populate("participants.userId", "email name");
    for (const challenge of challenges) {
      for (const participant of challenge.participants) {
        const userId = participant.userId._id;

        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        const checkIn = await CheckIn.findOne({
          user: userId,
          challenge: challenge._id,
          timestamp: { $gte: todayStart, $lt: todayEnd }
        });

        if (!checkIn) {
          participant.streak = 0;
          participant.missedCount += 1;
        }
      }
      await challenge.save();
    }
    console.log("Streak reset job completed.");
  } catch (err) {
    console.error("Streak job error:", err.message);
  }
});

cron.schedule("0 8 * * *", async () => {
  console.log("⏳ Running reminder job...");
  try {
    const challenges = await Challenge.find().populate("participants.userId", "email name");
    for (const challenge of challenges) {
      for (const participant of challenge.participants) {
        if (participant.userId?.email) {
          await sendEmailReminder(participant.userId.email, challenge.title);
        }
      }
    }
    console.log(" Reminder job completed.");
  } catch (err) {
    console.error("Reminder job error:", err.message);
  }
});

export default cron;