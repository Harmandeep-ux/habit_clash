import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAward, FiTrendingUp, FiZap, FiUser, FiStar } from 'react-icons/fi';
import { getAllLeaders } from '../api/ChallengeApi';

const AllLeader = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const data = await getAllLeaders();
        setLeaders(data);
      } catch (err) {
        setError('Failed to load leaderboard');
        console.error('Error fetching leaders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaders();
  }, []);

  const getRankColor = (rank) => {
    switch(rank) {
      case 1: return 'from-yellow-400 to-yellow-600';
      case 2: return 'from-gray-300 to-gray-400';
      case 3: return 'from-yellow-700 to-yellow-800';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center p-6 bg-red-900/20 rounded-xl border border-red-700/50">
          <p className="text-red-400 text-xl">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-400 mb-2">
            Global Leaderboard
          </h1>
          <p className="text-gray-400 text-lg">
            Top performers across all challenges
          </p>
        </motion.div>

        {leaders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-700"
          >
            <FiAward className="mx-auto text-5xl text-gray-500 mb-4" />
            <h3 className="text-2xl text-gray-300 mb-2">No leaders yet</h3>
            <p className="text-gray-500 mb-6">Complete challenges to appear on the leaderboard</p>
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-medium py-3 px-8 rounded-lg hover:shadow-yellow-400/30 transition-all text-lg">
              <FiTrendingUp /> Join a Challenge
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {/* Top 3 Leaders with special cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {leaders.slice(0, 3).map((leader, index) => (
                <motion.div
                  key={leader._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-gradient-to-br ${getRankColor(index + 1)} p-1 rounded-2xl shadow-lg`}
                >
                  <div className="bg-gray-900 rounded-xl p-6 h-full">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`text-2xl font-bold ${index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-300' : 'text-yellow-700'}`}>
                        #{index + 1}
                      </div>
                      {index === 0 && (
                        <FiStar className="text-3xl text-yellow-400" />
                      )}
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full bg-gray-800 mb-4 flex items-center justify-center border-2 border-orange-400/50">
                        {leader.avatar ? (
                          <img 
                            src={leader.avatar} 
                            alt={leader.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <FiUser className="text-3xl text-gray-400" />
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-center">{leader.name}</h3>
                      <p className="text-gray-400 text-sm mb-4">@{leader.username}</p>
                      <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                          <p className="text-gray-400 text-sm">Points</p>
                          <p className="text-yellow-400 font-bold text-xl">{leader.totalPoints}</p>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                          <p className="text-gray-400 text-sm">Streak</p>
                          <p className="text-orange-400 font-bold text-xl">{leader.streak}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Full Leaderboard Table */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-700/50 text-gray-300">
                      <th className="py-4 px-6 text-left font-medium">Rank</th>
                      <th className="py-4 px-6 text-left font-medium">Participant</th>
                      <th className="py-4 px-6 text-center font-medium">
                        <div className="flex items-center justify-center gap-1">
                          <FiZap className="text-yellow-400" /> Points
                        </div>
                      </th>
                      <th className="py-4 px-6 text-center font-medium">
                        <div className="flex items-center justify-center gap-1">
                          <FiTrendingUp className="text-orange-400" /> Streak
                        </div>
                      </th>
                      <th className="py-4 px-6 text-center font-medium">Challenges</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/50">
                    <AnimatePresence>
                      {leaders.slice(3).map((leader, index) => (
                        <motion.tr
                          key={leader._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: (index + 3) * 0.05 }}
                          className="hover:bg-gray-700/30 transition-colors bg-gray-800/30"
                        >
                          <td className="py-4 px-6 font-bold text-gray-400">#{index + 4}</td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                                {leader.avatar ? (
                                  <img
                                    src={leader.avatar}
                                    alt={leader.name}
                                    className="w-full h-full rounded-full object-cover"
                                  />
                                ) : (
                                  <FiUser className="text-gray-400" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium">{leader.name}</p>
                                <p className="text-xs text-gray-400">@{leader.username}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center font-bold text-yellow-400">
                            {leader.totalPoints}
                          </td>
                          <td className="py-4 px-6 text-center">
                            <div className="inline-flex items-center gap-1 bg-orange-500/10 px-3 py-1 rounded-full">
                              <FiTrendingUp className="text-orange-400" />
                              <span>{leader.streak}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center text-gray-400">
                            {leader.completedChallenges || 0}
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllLeader;