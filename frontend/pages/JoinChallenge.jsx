import React, { useEffect, useState } from "react";
import { getAllChallengesApi, joinChallengeApi } from "../api/ChallengeApi";

const JoinChallenge = () => {
  const [challenges, setChallenges] = useState([]);

  // Fetch all challenges on page load
  const fetchChallenges = async () => {
    try {
      const data = await getAllChallengesApi();
      setChallenges(data);
    } catch (err) {
      console.error("Error fetching challenges:", err.message);
    }
  };

  // Handle join challenge
  const handleJoin = async (id) => {
    try {
      await joinChallengeApi(id);
      alert("Joined challenge successfully!");
      fetchChallenges(); // refresh list after joining
    } catch (err) {
      console.error("Error joining challenge:", err.message);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  return (
    <div>
      <h1>Available Challenges</h1>
      {challenges.map((challenge) => (
        <div key={challenge._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <h3>{challenge.title}</h3>
          <p>{challenge.description}</p>
          <p>Type: {challenge.habitType}</p>
          <p>Created by: {challenge.creator.name}</p>
          <button onClick={() => handleJoin(challenge._id)}>Join</button>
        </div>
      ))}
    </div>
  );
};

export default JoinChallenge;
