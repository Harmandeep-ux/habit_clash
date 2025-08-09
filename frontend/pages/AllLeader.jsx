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

  const rankColors = [
    'from-yellow-300 via-yellow-500 to-yellow-700',
    'from-gray-300 via-gray-400 to-gray-500',
    'from-amber-600 via-amber-700 to-amber-800'
  ];

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
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-300 animate-pulse">
            🏆 Global Leaderboard
          </h1>
          <p className="text-gray-400 text-lg mt-2">
            Celebrating the best of the best across all challenges
          </p>
        </motion.div>

        {/* Podium Section */}
        {leaders.length > 0 && (
          <div className="flex justify-center gap-6 mb-16 items-end">
            {leaders.slice(0, 3).map((leader, index) => (
              <motion.div
                key={leader._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className={`relative bg-gradient-to-t ${rankColors[index]} p-1 rounded-2xl shadow-xl w-48`}
                style={{ height: `${200 - index * 30}px` }}
              >
                <div className="bg-gray-900 rounded-xl p-5 flex flex-col items-center h-full justify-end relative">
                  {index === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.8 }}
                      transition={{ delay: 0.4, duration: 1 }}
                      className="absolute -top-8 text-yellow-300 text-5xl"
                    >
                      <FiStar />
                    </motion.div>
                  )}
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-yellow-300 mb-3">
                    {leader.avatar ? (
                      <img
                        src={leader.avatar}
                        alt={leader.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-700">
                        <FiUser className="text-3xl text-gray-300" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white">{leader.name}</h3>
                  <p className="text-sm text-gray-400">@{leader.username}</p>
                  <div className="mt-3 text-yellow-400 font-bold text-lg">{leader.totalPoints} pts</div>
                  <div className="text-orange-400 text-sm">🔥 {leader.streak} streak</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden shadow-lg"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-700/50 text-gray-300">
                  <th className="py-4 px-6 text-left">Rank</th>
                  <th className="py-4 px-6 text-left">Participant</th>
                  <th className="py-4 px-6 text-center">Points</th>
                  <th className="py-4 px-6 text-center">Streak</th>
                  <th className="py-4 px-6 text-center">Challenges</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                <AnimatePresence>
                  {leaders.slice(3).map((leader, index) => (
                    <motion.tr
                      key={leader._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="py-4 px-6 font-bold text-gray-400">#{index + 4}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                            {leader.avatar ? (
                              <img
                                src={leader.avatar}
                                alt={leader.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <FiUser className="text-gray-400 w-full h-full p-2" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-white">{leader.name}</p>
                            <p className="text-xs text-gray-400">@{leader.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center text-yellow-400 font-bold">
                        {leader.totalPoints}
                      </td>
                      <td className="py-4 px-6 text-center text-orange-400">
                        {leader.streak}
                      </td>
                      <td className="py-4 px-6 text-center text-gray-300">
                        {leader.completedChallenges || 0}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AllLeader;
