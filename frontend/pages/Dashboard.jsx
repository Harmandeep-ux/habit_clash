import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import StreakWidget from '../components/StreakWidget';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 font-sans">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-yellow-400/10 blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.header 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 mb-4 leading-tight">
            Welcome to Your <br className="hidden md:block" /> Habit Journey
          </h1>
          <p className="text-orange-200/90 text-xl max-w-3xl mx-auto">
            Build better habits through friendly competition and daily commitment
          </p>
          
          {/* Animated Progress Bar */}
          <motion.div 
            className="mt-8 h-1.5 bg-gray-700 rounded-full overflow-hidden max-w-2xl mx-auto"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.4, duration: 1.2, ease: "easeInOut" }}
          >
            <div className="h-full bg-gradient-to-r from-orange-500 to-yellow-500"></div>
          </motion.div>
        </motion.header>

        {/* Main Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Create Challenge */}
          <motion.div
            className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/30 hover:border-orange-500/50 transition-all shadow-lg hover:shadow-xl hover:shadow-orange-500/10"
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="flex items-center mb-6">
              <div className="text-4xl text-orange-400 mr-4">✨</div>
              <h3 className="text-2xl font-semibold text-yellow-400">Create Challenge</h3>
            </div>
            <p className="text-orange-200/80 mb-6 text-lg">
              Design your own habit-building challenge with custom rules and goals
            </p>
            <Link to={'/createchallenge'}>
              <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black font-medium py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
                Start Creating
              </button>
            </Link>
          </motion.div>

          

          {/* Join Challenge */}
          <motion.div
            className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/30 hover:border-orange-500/50 transition-all shadow-lg hover:shadow-xl hover:shadow-orange-500/10"
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="flex items-center mb-6">
              <div className="text-4xl text-orange-400 mr-4">🏆</div>
              <h3 className="text-2xl font-semibold text-yellow-400">Join Challenge</h3>
            </div>
            <p className="text-orange-200/80 mb-6 text-lg">
              Discover and join exciting challenges created by our community
            </p>
            <Link to={`/globalchallenge`}>
              <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black font-medium py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
                Browse Challenges
              </button>
            </Link>
          </motion.div>

          {/* My Challenges */}
          <motion.div
            className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/30 hover:border-orange-500/50 transition-all shadow-lg hover:shadow-xl hover:shadow-orange-500/10"
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div className="flex items-center mb-6">
              <div className="text-4xl text-orange-400 mr-4">📊</div>
              <h3 className="text-2xl font-semibold text-yellow-400">My Challenges</h3>
            </div>
            <p className="text-orange-200/80 mb-6 text-lg">
              Track your progress in current challenges and maintain your streaks
            </p>
            <Link to='/mine'>
              <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black font-medium py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
                View Progress
              </button>
            </Link>
          </motion.div>

          {/* Leaderboard */}
          <motion.div
            className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/30 hover:border-orange-500/50 transition-all shadow-lg hover:shadow-xl hover:shadow-orange-500/10"
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <div className="flex items-center mb-6">
              <div className="text-4xl text-orange-400 mr-4">🏅</div>
              <h3 className="text-2xl font-semibold text-yellow-400">Leaderboard</h3>
            </div>
            <p className="text-orange-200/80 mb-6 text-lg">
              See who's leading and find motivation to climb the ranks
            </p>
            <Link to={'/globalLeaders'}>
              <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black font-medium py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
                View Rankings
              </button>
            </Link>
          </motion.div>

          {/* Invite Friends */}
          <motion.div
            className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/30 hover:border-orange-500/50 transition-all shadow-lg hover:shadow-xl hover:shadow-orange-500/10"
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <div className="flex items-center mb-6">
              <div className="text-4xl text-orange-400 mr-4">👥</div>
              <h3 className="text-2xl font-semibold text-yellow-400">Invite Friends</h3>
            </div>
            <p className="text-orange-200/80 mb-6 text-lg">
              Bring friends into your challenges for accountability and fun
            </p>
            <Link to='/invite'>
              <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black font-medium py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
                Send Invites
              </button>
            </Link>
          </motion.div>

          {/* My Streak */}
          <motion.div
            className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/30 hover:border-orange-500/50 transition-all shadow-lg hover:shadow-xl hover:shadow-orange-500/10"
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <div className="flex items-center mb-6">
              <div className="text-4xl text-orange-400 mr-4">🔥</div>
              <h3 className="text-2xl font-semibold text-yellow-400">My Streak</h3>
            </div>
            <div className="mb-6">
              <p className="text-orange-200/80 mb-1">Current streak:</p>
              <StreakWidget />
            </div>
          </motion.div>

          {/* Empty Slot for Future Feature */}
          <motion.div
            className="bg-gray-800/20 backdrop-blur-sm rounded-2xl p-8 border-2 border-dashed border-orange-500/30 hover:border-orange-500/50 transition-all"
            whileHover={{ y: -8 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-4xl text-orange-400 mb-4">+</div>
                <h3 className="text-xl font-semibold text-yellow-400">Coming Soon</h3>
                <p className="text-orange-200/60 mt-2">New feature on the way!</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Motivational Section */}
        <motion.div 
          className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-10 text-center border border-orange-500/30 shadow-lg mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-semibold mb-6 text-yellow-400">Keep Going!</h3>
            <p className="text-orange-200/90 text-xl mb-8 leading-relaxed">
              "Success is the sum of small efforts, repeated day in and day out."
            </p>
            <motion.button 
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black font-medium py-4 px-10 rounded-xl inline-flex items-center text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>You've Got This</span>
              <span className="ml-3">💪</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="text-center text-orange-200/60 text-sm pb-8">
          <p>Habit Tracker Pro • Building better habits every day</p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;