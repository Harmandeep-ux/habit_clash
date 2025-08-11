// components/CheckInPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiX, FiCamera } from 'react-icons/fi';
import { checkInToday } from '../api/checkinApi';

const CheckInPage = () => {
  const { challengeId } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { success, error } = await checkInToday(challengeId, photo, comment);
      
      if (success) {
        navigate(`/success`, { state: { checkInSuccess: true } });
      } else {
        setError(error || "Check-in failed");
      }
    } catch (err) {
      setError("An unexpected error occurred",err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-6 flex items-center justify-center">
      <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl w-full max-w-md p-6 border border-orange-500/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-orange-300">Daily Check-In</h2>
          <button 
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white"
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-orange-200 mb-2">Add a comment (optional)</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              rows={3}
              maxLength={200}
              placeholder="How's your progress today?"
            />
          </div>

          <div className="mb-6">
            <label className="block text-orange-200 mb-2">Add photo proof (optional)</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-lg p-3 transition-colors cursor-pointer">
                <FiCamera className="mr-2" />
                {photo ? 'Change Photo' : 'Upload Photo'}
                <input
                  type="file"
                  onChange={handlePhotoChange}
                  accept="image/*"
                  className="hidden"
                />
              </label>
              {preview && (
                <div className="relative">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPhoto(null);
                      setPreview(null);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                  >
                    <FiX size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 text-red-300 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all"
          >
            {isSubmitting ? (
              'Submitting...'
            ) : (
              <>
                <FiCheckCircle /> Submit Check-In
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckInPage;