import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiAward, FiTarget, FiCalendar, FiEdit2, FiPlus } from 'react-icons/fi';
import { createChallenge } from '../api/ChallengeApi';

const CreateChallenge = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage('');

    try {
      const response = await createChallenge({
        title: data.title,
        description: data.description,
        habitType: data.habitType,
        durationDays: parseInt(data.durationDays),
      });

      setMessage('Challenge created successfully! Your journey begins now!');
      reset();
    } catch (error) {
      console.error('Error creating challenge:', error);
      setMessage('Failed to create challenge. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4 relative overflow-hidden">
      {/* Motivational Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 opacity-95 z-0"></div>
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-yellow-500 blur-xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-orange-500 blur-xl"></div>
        <div className="absolute top-1/3 right-1/3 w-28 h-28 rounded-full bg-red-500 blur-xl"></div>
      </div>

      <motion.div 
        className="relative z-10 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header with inspirational message */}
        <div className="bg-gradient-to-r from-orange-900/50 to-yellow-900/50 p-6 border-b border-orange-500/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/20 rounded-full">
              <FiTarget className="text-orange-400 text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-yellow-300">
                Create Your Challenge
              </h2>
              <p className="text-orange-200 mt-1">
                Design a challenge that pushes limits and builds habits
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {message && (
            <motion.div 
              className={`p-4 mb-6 rounded-lg ${message.includes('successfully') ? 'bg-green-900/40 border border-green-700' : 'bg-red-900/40 border border-red-700'}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3">
                {message.includes('successfully') ? (
                  <FiAward className="text-green-400 text-xl flex-shrink-0" />
                ) : (
                  <FiAward className="text-red-400 text-xl flex-shrink-0" />
                )}
                <p className="text-sm md:text-base">{message}</p>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-3">
                  <FiEdit2 className="text-orange-400" />
                  <label className="text-sm font-semibold text-orange-300 uppercase tracking-wider">
                    Challenge Title
                  </label>
                </div>
                <input
                  type="text"
                  {...register('title', { required: 'Challenge needs a title' })}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
                  placeholder="e.g. 30-Day Fitness Transformation"
                />
                {errors.title && (
                  <p className="mt-2 text-sm text-red-400">{errors.title.message}</p>
                )}
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-3">
                  <FiEdit2 className="text-orange-400" />
                  <label className="text-sm font-semibold text-orange-300 uppercase tracking-wider">
                    Description
                  </label>
                </div>
                <textarea
                  {...register('description', { required: 'Describe your challenge' })}
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
                  placeholder="What will participants need to do? What are the rules?"
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-400">{errors.description.message}</p>
                )}
              </div>

              {/* Habit Type */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FiTarget className="text-orange-400" />
                  <label className="text-sm font-semibold text-orange-300 uppercase tracking-wider">
                    Habit Category
                  </label>
                </div>
                <select
                  {...register('habitType', { required: 'Select a category' })}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select category</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Nutrition">Nutrition</option>
                  <option value="Mindfulness">Mindfulness</option>
                  <option value="Productivity">Productivity</option>
                  <option value="Learning">Learning</option>
                  <option value="Creativity">Creativity</option>
                </select>
                {errors.habitType && (
                  <p className="mt-2 text-sm text-red-400">{errors.habitType.message}</p>
                )}
              </div>

              {/* Duration */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FiCalendar className="text-orange-400" />
                  <label className="text-sm font-semibold text-orange-300 uppercase tracking-wider">
                    Duration
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    {...register('durationDays', {
                      required: 'Set a duration',
                      min: { value: 1, message: 'Minimum 1 day' },
                      max: { value: 365, message: 'Maximum 1 year' }
                    })}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all pr-16"
                    placeholder="21"
                  />
                  <span className="absolute right-3 top-3 text-gray-400">days</span>
                </div>
                {errors.durationDays && (
                  <p className="mt-2 text-sm text-red-400">{errors.durationDays.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className={`w-full py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                loading
                  ? 'bg-gray-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-gray-900 hover:shadow-lg hover:shadow-yellow-500/20'
              }`}
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Your Challenge...
                </>
              ) : (
                <>
                  <FiPlus /> Launch Challenge
                </>
              )}
            </motion.button>
          </form>
        </div>

        {/* Footer with motivational text */}
        <div className="bg-gray-900/50 p-4 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>Every great achievement begins with a challenge. What will yours be?</p>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateChallenge;