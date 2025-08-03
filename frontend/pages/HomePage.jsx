import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 to-yellow-900/10"></div>
        <div className="relative max-w-4xl mx-auto">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Transform Your Habits
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-orange-200 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Build streaks, challenge friends, and become your best self
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link 
              to="/dashboard" 
              className="inline-block bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-yellow-400/30 transition-all"
            >
              Start Your Journey
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-orange-300">Why Habit Clash Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Card 1 */}
          <motion.div 
            className="bg-gray-800/50 rounded-xl p-6 border border-orange-500/20 hover:border-orange-500/40 transition-all"
            whileHover={{ y: -5 }}
          >
            <div className="text-4xl text-yellow-400 mb-4">🔥</div>
            <h3 className="text-xl font-semibold mb-3">Daily Streaks</h3>
            <p className="text-orange-200">
              Build momentum with visual progress tracking that keeps you motivated every day.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            className="bg-gray-800/50 rounded-xl p-6 border border-orange-500/20 hover:border-orange-500/40 transition-all"
            whileHover={{ y: -5 }}
          >
            <div className="text-4xl text-yellow-400 mb-4">🏆</div>
            <h3 className="text-xl font-semibold mb-3">Friendly Competition</h3>
            <p className="text-orange-200">
              Challenge friends and see who can maintain the longest streaks.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            className="bg-gray-800/50 rounded-xl p-6 border border-orange-500/20 hover:border-orange-500/40 transition-all"
            whileHover={{ y: -5 }}
          >
            <div className="text-4xl text-yellow-400 mb-4">✨</div>
            <h3 className="text-xl font-semibold mb-3">Custom Challenges</h3>
            <p className="text-orange-200">
              Create or join challenges tailored to your personal growth goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-gray-800/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-orange-300">How It Works</h2>
          
          <div className="space-y-10">
            {/* Step 1 */}
            <motion.div 
              className="flex flex-col md:flex-row items-center gap-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gradient-to-br from-orange-500 to-yellow-500 text-black font-bold text-2xl w-16 h-16 rounded-full flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Create or Join a Challenge</h3>
                <p className="text-orange-200">
                  Start your own habit challenge or browse existing ones from our community.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              className="flex flex-col md:flex-row items-center gap-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-orange-500 to-yellow-500 text-black font-bold text-2xl w-16 h-16 rounded-full flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Check In Daily</h3>
                <p className="text-orange-200">
                  Mark your progress each day to build and maintain your streak.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              className="flex flex-col md:flex-row items-center gap-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-gradient-to-br from-orange-500 to-yellow-500 text-black font-bold text-2xl w-16 h-16 rounded-full flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Compete & Improve</h3>
                <p className="text-orange-200">
                  Track your position on leaderboards and watch your habits transform.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-400">Ready to Transform Your Habits?</h2>
          <p className="text-xl text-orange-200 mb-8">
            Join thousands of users building better habits through friendly competition.
          </p>
          <Link 
            to="/dashboard" 
            className="inline-block bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-yellow-400/30 transition-all"
          >
            Get Started - It's Free
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;