import React, { useEffect, useState } from "react";
import { getAllChallengesApi, joinChallengeApi } from "../api/ChallengeApi";
import { motion } from "framer-motion";

const JoinChallenge = () => {
  const [challenges, setChallenges] = useState([]);

  // Get logged-in user ID from localStorage
  const loggedInUserId = (() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?._id || null;
    } catch {
      return null;
    }
  })();

  // Check if user is already a participant
  const hasJoined = (challenge) => {
    return challenge?.participants?.some((p) => {
      // p could be string or object
      if (typeof p === "string") return p === loggedInUserId;
      if (typeof p === "object") return p?.userId === loggedInUserId || p?.userId?._id === loggedInUserId;
      return false;
    });
  };

  // Fetch challenges
  const fetchChallenges = async () => {
    try {
      const data = await getAllChallengesApi();
      setChallenges(data);
    } catch (err) {
      console.error("Error fetching challenges:", err.message);
    }
  };

  // Join challenge
  const handleJoin = async (id) => {
    try {
      await joinChallengeApi(id);
      alert("🎉 Joined challenge successfully!");
      fetchChallenges();
    } catch (err) {
      console.error("Error joining challenge:", err.message);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 px-6 py-12 text-white">
      <motion.h1
        className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🚀 Available Challenges
      </motion.h1>

      {challenges.length === 0 ? (
        <p className="text-center text-gray-400">No challenges found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge._id}
              className="bg-gray-800/50 border border-orange-500/20 rounded-2xl p-6 flex flex-col justify-between shadow-lg hover:shadow-orange-400/20 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <div>
                <h3 className="text-2xl font-semibold text-yellow-400 mb-2">
                  {challenge.title}
                </h3>
                <p className="text-orange-200 mb-4">{challenge.description}</p>
                <p className="text-sm text-gray-400 mb-2">
                  <span className="font-semibold text-orange-300">Type:</span>{" "}
                  {challenge.habitType}
                </p>
                <p className="text-sm text-gray-400 mb-4">
                  <span className="font-semibold text-orange-300">Created by:</span>{" "}
                  {challenge.creator?.name || "Unknown"}
                </p>
              </div>

              {hasJoined(challenge) ? (
                <button
                  disabled
                  className="mt-4 w-full bg-gray-700 text-gray-300 font-bold py-2 px-4 rounded-lg cursor-not-allowed"
                >
                  ✅ Already Joined
                </button>
              ) : (
                <button
                  onClick={() => handleJoin(challenge._id)}
                  className="mt-4 w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-orange-400/30 transition-all"
                >
                  Join Challenge
                </button>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JoinChallenge;
