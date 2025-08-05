import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiUsers, FiAward, FiCalendar, FiPlus, FiArrowRight, FiX } from 'react-icons/fi';
import { getMyChallenges } from '../api/ChallengeApi';
import InviteModal from './InviteModal';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ChallengeCard = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const { challenge } = await getMyChallenges();
        setChallenges(challenge);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  const calculateProgress = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    
    if (today > end) return 100;
    if (today < start) return 0;
    
    const total = end - start;
    const elapsed = today - start;
    return Math.round((elapsed / total) * 100);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-orange-500 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-yellow-500 blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-8">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-400"
          >
            My Challenges
          </motion.h2>
        </div>

        {challenges.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-gray-800/50 rounded-xl border border-dashed border-gray-700"
          >
            <p className="text-gray-400 mb-4">You haven't joined any challenges yet</p>
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-medium py-2 px-6 rounded-lg hover:shadow-yellow-400/30 transition-all">
              <FiPlus /> Browse Challenges
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {challenges.map((ch) => {
                const progress = calculateProgress(ch.startDate, ch.endDate);
                const isCompleted = progress === 100;
                
                return (
                  <motion.div
                    key={ch._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden border ${isCompleted ? 'border-green-500/20' : 'border-orange-500/20'} hover:shadow-lg hover:shadow-orange-500/10 transition-all`}
                  >
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-orange-300">{ch.title}</h3>
                        {isCompleted && (
                          <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-900/40 text-green-300">
                            Completed
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-4">{ch.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="flex items-center text-xs text-orange-200 bg-orange-900/30 px-2 py-1 rounded">
                          <FiClock className="mr-1" /> {ch.durationDays} days
                        </span>
                        <span className="flex items-center text-xs text-yellow-200 bg-yellow-900/30 px-2 py-1 rounded">
                          <FiUsers className="mr-1" /> {ch.participants.length} participants
                        </span>
                        <span className="flex items-center text-xs text-blue-200 bg-blue-900/30 px-2 py-1 rounded">
                          {ch.habitType}
                        </span>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Progress</span>
                          <span>
                            {Math.floor((progress / 100) * ch.durationDays)}/{ch.durationDays} days
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-gradient-to-r from-orange-500 to-yellow-500'}`}
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-3 border-t border-gray-700/50">
                        <div className="text-xs text-gray-400">
                          <div className="flex items-center gap-1">
                            <FiCalendar size={12} />
                            {new Date(ch.startDate).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedChallenge(ch);
                              setShowInviteModal(true);
                            }}
                            className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-lg transition-colors"
                          >
                            Invite
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedChallenge(ch);
                              setShowDetailModal(true);
                            }}
                            className="text-xs bg-gradient-to-r from-orange-500 to-yellow-500 text-black px-3 py-1 rounded-lg hover:shadow-yellow-400/30 transition-all flex items-center gap-1"
                          >
                            View <FiArrowRight size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Invite Modal */}
        {showInviteModal && selectedChallenge && (
          <InviteModal 
            challengeId={selectedChallenge._id}
            onClose={() => {
              setShowInviteModal(false);
              setSelectedChallenge(null);
            }} 
          />
        )}

        {/* Challenge Detail Modal */}
        {showDetailModal && selectedChallenge && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-orange-400">{selectedChallenge.title}</h3>
                  <button 
                    onClick={() => setShowDetailModal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <FiX size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Challenge Details</h4>
                    <p className="text-gray-300 mb-4">{selectedChallenge.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <FiClock className="text-orange-400" />
                        <span className="text-gray-300">
                          <strong>Duration:</strong> {selectedChallenge.durationDays} days
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiUsers className="text-yellow-400" />
                        <span className="text-gray-300">
                          <strong>Participants:</strong> {selectedChallenge.participants.length}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiCalendar className="text-blue-400" />
                        <span className="text-gray-300">
                          <strong>Dates:</strong> {new Date(selectedChallenge.startDate).toLocaleDateString()} - {new Date(selectedChallenge.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Progress</h4>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>Completion</span>
                        <span>
                          {Math.floor((calculateProgress(selectedChallenge.startDate, selectedChallenge.endDate) / 100) * selectedChallenge.durationDays)}/
                          {selectedChallenge.durationDays} days
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${
                            calculateProgress(selectedChallenge.startDate, selectedChallenge.endDate) === 100 
                              ? 'bg-green-500' 
                              : 'bg-gradient-to-r from-orange-500 to-yellow-500'
                          }`}
                          style={{ width: `${calculateProgress(selectedChallenge.startDate, selectedChallenge.endDate)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-white mb-3">Actions</h4>
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => {
                            setShowDetailModal(false);
                            setShowInviteModal(true);
                          }}
                          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <FiUsers /> Invite Friends
                        </button>
                        
                      <button 
  onClick={() => {
    navigate(`/leaderboard/${selectedChallenge._id}`);
  }}
  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
>
  <FiAward /> View Leaderboard
</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeCard;