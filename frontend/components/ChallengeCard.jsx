import React, { useEffect, useState } from 'react';
import { getMyChallenges } from '../api/ChallengeApi';

const ChallengeCard = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const { challenge } = await getMyChallenges(); // Expected { challenge: [...] }
        setChallenges(challenge);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  if (loading) return <p>Loading challenges...</p>;

  return (
    <div>
      <h2>My Challenges</h2>
      {challenges.length === 0 ? (
        <p>No challenges found.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
          {challenges.map((ch) => (
            <div key={ch._id} style={cardStyle}>
              <h3>{ch.title}</h3>
              <p>{ch.description}</p>
              <p><strong>Habit Type:</strong> {ch.habitType}</p>
              <p><strong>Duration:</strong> {ch.durationDays} days</p>
              <p><strong>Start:</strong> {new Date(ch.startDate).toLocaleDateString()}</p>
              <p><strong>End:</strong> {new Date(ch.endDate).toLocaleDateString()}</p>
              <p><strong>Participants:</strong> {ch.participants.length}</p>
              <p><strong>ID:</strong> {ch._id}</p>
              <button>Invite Friends</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};



export default ChallengeCard;
