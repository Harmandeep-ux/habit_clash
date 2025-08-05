import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // If you're using URL params
import { getLeaderboards } from '../api/ChallengeApi';

const Leaderboard = () => {
  const { challengeId } = useParams(); // Ensure your route is like /leaderboard/:challengeId
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchLeaderboard = async () => {
    try {
      const data = await getLeaderboards(challengeId);
      console.log('Leaderboard API response:', data);

      // ✅ Ensure we're setting the array
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


  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-orange-400 mb-4">Leaderboard</h2>
      {leaderboard.length === 0 ? (
        <p className="text-gray-400">No participants yet.</p>
      ) : (
        <table className="w-full text-left border border-gray-700 rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-orange-300">
              <th className="py-2 px-4">Rank</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Points</th>
              <th className="py-2 px-4">Streak</th>
              <th className="py-2 px-4">Badge</th>
              <th className="py-2 px-4">Next Goal</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'
                } hover:bg-gray-700 transition`}
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.totalPoints}</td>
                <td className="py-2 px-4">{item.streak}</td>
                <td className="py-2 px-4">{item.badge}</td>
                <td className="py-2 px-4">{item.nextGoal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
