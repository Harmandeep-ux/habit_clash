import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Sample data - replace with your actual data
  const currentStreak = 7;
  const leaderboard = [
    { name: 'You', score: 420, position: 1 },
    { name: 'Alex', score: 380, position: 2 },
    { name: 'Sam', score: 350, position: 3 },
  ];
  const activeChallenges = [
    { id: 1, name: '30-Day Fitness', participants: 24, daysLeft: 12 },
    { id: 2, name: 'Morning Routine', participants: 15, daysLeft: 5 },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <header className="mb-8">
        <motion.h1 
          className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Dashboard
        </motion.h1>
        <p className="text-orange-200">Welcome back, ready to build some streaks?</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Streak Card */}
        <motion.div 
          className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20"
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-orange-400 font-medium">Current Streak</h3>
              <p className="text-4xl font-bold">{currentStreak} days</p>
            </div>
            <div className="text-4xl">🔥</div>
          </div>
          <Link to="/streaks" className="text-yellow-400 text-sm mt-4 inline-block hover:underline">
            View all streaks →
          </Link>
        </motion.div>

        {/* Leaderboard Card */}
        <motion.div 
          className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20"
          whileHover={{ y: -5 }}
        >
          <h3 className="text-orange-400 font-medium mb-4">Leaderboard</h3>
          <div className="space-y-3">
            {leaderboard.map((user) => (
              <div key={user.name} className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <span className={`w-6 h-6 flex items-center justify-center rounded-full ${user.position === 1 ? 'bg-yellow-500 text-black' : 'bg-gray-700'}`}>
                    {user.position}
                  </span>
                  <span className={user.name === 'You' ? 'font-bold text-yellow-400' : ''}>
                    {user.name}
                  </span>
                </div>
                <span>{user.score} pts</span>
              </div>
            ))}
          </div>
          <Link to="/leaderboard" className="text-yellow-400 text-sm mt-4 inline-block hover:underline">
            Full leaderboard →
          </Link>
        </motion.div>

        {/* Quick Actions Card */}
        <motion.div 
          className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20"
          whileHover={{ y: -5 }}
        >
          <h3 className="text-orange-400 font-medium mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link to="/challenges/join" className="block bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-medium py-2 px-4 rounded-lg text-center">
              Join a Challenge
            </Link>
            <Link to="/challenges/create" className="block bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors">
              Create Challenge
            </Link>
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Invite Friends
            </button>
          </div>
        </motion.div>
      </div>

      {/* Active Challenges */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-orange-300">Your Active Challenges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeChallenges.map((challenge) => (
            <motion.div
              key={challenge.id}
              className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{challenge.name}</h3>
                  <p className="text-orange-200">{challenge.participants} participants</p>
                </div>
                <span className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm">
                  {challenge.daysLeft} days left
                </span>
              </div>
              <div className="mt-4 flex space-x-3">
                <Link to={`/challenge/${challenge.id}`} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors">
                  View Challenge
                </Link>
                <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Share
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Empty State for Challenges */}
      {activeChallenges.length === 0 && (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-orange-200 mb-4">You're not in any challenges yet</p>
          <Link to="/challenges/join" className="inline-block bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-medium py-2 px-6 rounded-lg">
            Join Your First Challenge
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;