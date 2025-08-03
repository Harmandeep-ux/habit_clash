import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createChallenge } from '../api/ChallengeApi';

const CreateChallenge = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage('');

    try {
      // ✅ Use API helper function
      const response = await createChallenge({
        title: data.title,
        description: data.description,
        habitType: data.habitType,
        durationDays: parseInt(data.durationDays),
      });

      setMessage('✅ Challenge Created Successfully!');
      console.log('Created Challenge:', response);

      reset(); // ✅ Clear form after success
    } catch (error) {
      console.error('Error creating challenge:', error);
      setMessage(error?.response?.data?.msg || '❌ Failed to create challenge');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 text-transparent bg-clip-text">
          Create Challenge
        </h2>

        {message && (
          <p className="text-center mb-4 text-yellow-400 font-semibold">{message}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block mb-2 text-orange-300 font-semibold">Title</label>
            <input
              type="text"
              {...register('title', { required: 'Title is required' })}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="Enter challenge title"
            />
            {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-orange-300 font-semibold">Description</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              rows="3"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="Describe the challenge"
            />
            {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>}
          </div>

          {/* Habit Type */}
          <div>
            <label className="block mb-2 text-orange-300 font-semibold">Habit Type</label>
            <input
              type="text"
              {...register('habitType', { required: 'Habit type is required' })}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="e.g. Fitness, Reading"
            />
            {errors.habitType && <p className="text-red-400 text-sm mt-1">{errors.habitType.message}</p>}
          </div>

          {/* Duration */}
          <div>
            <label className="block mb-2 text-orange-300 font-semibold">Duration (Days)</label>
            <input
              type="number"
              {...register('durationDays', {
                required: 'Duration is required',
                min: { value: 1, message: 'Duration must be at least 1 day' }
              })}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="Enter duration in days"
            />
            {errors.durationDays && <p className="text-red-400 text-sm mt-1">{errors.durationDays.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold py-3 rounded-lg text-lg shadow-lg hover:shadow-yellow-400/30 transition-all disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Challenge'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateChallenge;
