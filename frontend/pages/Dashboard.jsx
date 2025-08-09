import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 font-sans">
      {/* Header */}
      <header className="mb-12 text-center">
        <motion.h1 
          className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to Your Habit Journey
        </motion.h1>
        <p className="text-orange-200 text-lg max-w-2xl mx-auto">
          Build better habits through friendly competition and daily commitment
        </p>
      </header>

      {/* Main Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* Create Challenge */}
        <motion.div
          className="bg-gray-800/80 rounded-xl p-6 border border-orange-500/20 hover:border-orange-500/40 transition-all"
          whileHover={{ y: -5 }}
        >
          <div className="text-3xl text-orange-400 mb-4">✨</div>
         <button className="text-2xl font-semibold mb-3 text-yellow-400">Create Challenge</button>
          <p className="text-orange-200 mb-5">
            Design your own habit-building challenge with custom rules and goals
          </p>
         <Link to={'/createchallenge'}>
          <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-medium py-3 px-6 rounded-lg">
            Start Creating
          </button>
         </Link > 
        </motion.div>

        {/* Join Challenge */}
        <motion.div
          className="bg-gray-800/80 rounded-xl p-6 border border-orange-500/20 hover:border-orange-500/40 transition-all"
          whileHover={{ y: -5 }}
        >
          <div className="text-3xl text-orange-400 mb-4">🏆</div>
      <h3 className="text-2xl font-semibold mb-3 text-yellow-400">Join Challenge</h3>
          <p className="text-orange-200 mb-5">
            Discover and join exciting challenges created by our community
          </p>
             <Link to={`/join/:challengeId`}>
              <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-medium py-3 px-6 rounded-lg">
            Browse Challenges
          </button>
             </Link>  
        </motion.div>

        {/* My Challenges */}
        <motion.div
          className="bg-gray-800/80 rounded-xl p-6 border border-orange-500/20 hover:border-orange-500/40 transition-all"
          whileHover={{ y: -5 }}
        >
          <div className="text-3xl text-orange-400 mb-4">📊</div>
          <h3 className="text-2xl font-semibold mb-3 text-yellow-400">My Challenges</h3>
          <p className="text-orange-200 mb-5">
            Track your progress in current challenges and maintain your streaks
          </p>
         <Link to='/mine'> 
         <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-medium py-3 px-6 rounded-lg">
            View Progress
          </button>
         </Link> 
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          className="bg-gray-800/80 rounded-xl p-6 border border-orange-500/20 hover:border-orange-500/40 transition-all"
          whileHover={{ y: -5 }}
        >
          <div className="text-3xl text-orange-400 mb-4">🏅</div>
          <h3 className="text-2xl font-semibold mb-3 text-yellow-400">Leaderboard</h3>
          <p className="text-orange-200 mb-5">
            See who's leading and find motivation to climb the ranks
          </p>
         <Link to={'/globalLeaders'}>
            <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-medium py-3 px-6 rounded-lg">
            View Rankings
          </button>
         </Link>
       
        </motion.div>

        {/* Invite Friends */}
        <motion.div
          className="bg-gray-800/80 rounded-xl p-6 border border-orange-500/20 hover:border-orange-500/40 transition-all"
          whileHover={{ y: -5 }}
        >
          <div className="text-3xl text-orange-400 mb-4">👥</div>
          <h3 className="text-2xl font-semibold mb-3 text-yellow-400">Invite Friends</h3>
          <p className="text-orange-200 mb-5">
            Bring friends into your challenges for accountability and fun
          </p>
         <Link to='/invite'> 
         <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-medium py-3 px-6 rounded-lg">
            Send Invites
          </button>
         </Link> 
        </motion.div>

        {/* My Streak */}
        <motion.div
          className="bg-gray-800/80 rounded-xl p-6 border border-orange-500/20 hover:border-orange-500/40 transition-all"
          whileHover={{ y: -5 }}
        >
          <div className="text-3xl text-orange-400 mb-4">🔥</div>
          <h3 className="text-2xl font-semibold mb-3 text-yellow-400">My Streak</h3>
          <p className="text-orange-200 mb-2">Current streak:</p>
          <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 mb-5">
            7 days
          </div>
          <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors">
            Streak History
          </button>
        </motion.div>
      </div>

      {/* Motivational Section */}
      <motion.div 
        className="bg-gray-800/50 rounded-xl p-8 text-center border border-orange-500/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-2xl font-semibold mb-3 text-yellow-400">Keep Going!</h3>
        <p className="text-orange-200 text-lg mb-5 max-w-2xl mx-auto">
          "Success is the sum of small efforts, repeated day in and day out."
        </p>
        <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-medium py-3 px-8 rounded-lg inline-flex items-center">
          <span>You've Got This</span>
          <span className="ml-2">💪</span>
        </button>
      </motion.div>
    </div>
  );
};

export default Dashboard;