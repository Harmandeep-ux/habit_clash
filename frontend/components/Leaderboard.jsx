import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAward, FiTrendingUp, FiZap, FiTarget, FiUser } from 'react-icons/fi';
import { getLeaderboards } from '../api/ChallengeApi';

const Leaderboard = () => {
  const { challengeId } = useParams();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboards(challengeId);
        setLeaderboard(Array.isArray(data) ? data : data.leaderboard || []);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    if (challengeId) {
      fetchLeaderboard();
    }
  }, [challengeId]);

  const getMedalColor = (rank) => {
    switch (rank) {
      case 1: return 'text-yellow-400';
      case 2: return 'text-gray-300';
      case 3: return 'text-yellow-600';
      default: return 'text-gray-500';
    }
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Gold': return 'bg-yellow-500/20 text-yellow-400';
      case 'Silver': return 'bg-gray-400/20 text-gray-300';
      case 'Bronze': return 'bg-yellow-600/20 text-yellow-600';
      default: return 'bg-blue-500/20 text-blue-400';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-400">
              Challenge Leaderboard
            </h2>
            <p className="text-gray-400 mt-2">See who's leading the competition</p>
          </div>
          <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700">
            <FiTrendingUp className="text-yellow-400" />
            <span className="text-sm text-gray-300">Live Updates</span>
          </div>
        </motion.div>

        {leaderboard.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-gray-800/50 rounded-xl border border-dashed border-gray-700"
          >
            <FiAward className="mx-auto text-4xl text-gray-500 mb-4" />
            <h3 className="text-xl text-gray-300 mb-2">No participants yet</h3>
            <p className="text-gray-500 mb-4">Be the first to join this challenge!</p>
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-medium py-2 px-6 rounded-lg hover:shadow-yellow-400/30 transition-all">
              Join Challenge
            </button>
          </motion.div>
        ) : (
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
                    <th className="py-4 px-6 text-center font-medium">Badge</th>
                    <th className="py-4 px-6 text-center font-medium">
                      <div className="flex items-center justify-center gap-1">
                        <FiTarget className="text-blue-400" /> Next Goal
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  <AnimatePresence>
                    {leaderboard.map((item, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`hover:bg-gray-700/30 transition-colors ${
                          index % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'
                        }`}
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <span className={`text-lg font-bold ${getMedalColor(index + 1)}`}>
                              {index + 1}
                            </span>
                            {index < 3 && (
                              <FiAward className={`text-xl ${getMedalColor(index + 1)}`} />
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                              {item.avatar ? (
                                <img
                                  src={item.avatar}
                                  alt={item.name}
                                  className="w-full h-full rounded-full object-cover"
                                />
                              ) : (
                                <FiUser className="text-gray-400" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-white">{item.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center font-bold text-yellow-400">
                          {item.totalPoints}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <div className="inline-flex items-center gap-1 bg-orange-500/10 px-3 py-1 rounded-full">
                            <FiTrendingUp className="text-orange-400" />
                            <span className='text-white'>{item.streak}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          {item.badge && (
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor(item.badge)}`}>
                              {item.badge}
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-center text-sm text-gray-400">
                          {item.nextGoal || '-'}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            <div className="bg-gray-800/50 p-4 border-t border-gray-700/50">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-400">
                  Showing {leaderboard.length} participants
                </p>
                <div className="flex gap-2">
                  <button className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded transition-colors">
                    Refresh
                  </button>
                 
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;