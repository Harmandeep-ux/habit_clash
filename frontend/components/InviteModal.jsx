import React, { useState } from 'react';
import { inviteUser } from '../api/ChallengeApi';

const InviteModal = ({ challengeId, onClose }) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInvite = async () => {
    if (!username.trim()) {
      setMessage('Please enter a username.');
      return;
    }

    try {
      setLoading(true);
      const response = await inviteUser(challengeId, username.trim());
      setMessage(response.msg || 'Invitation sent successfully!');
      setUsername('');
    } catch (error) {
      setMessage(error.response?.data?.msg || 'Failed to send invite.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="invite-modal" style={modalStyle}>
      <h2>Invite Friend</h2>
      <input
        type="text"
        placeholder="Enter friend's username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={loading}
      />
      <button onClick={handleInvite} disabled={loading}>
        {loading ? 'Sending...' : 'Send Invite'}
      </button>
      <button onClick={onClose}>Close</button>
      {message && <p>{message}</p>}
    </div>
  );
};

// Simple inline style for modal (replace with Tailwind/Custom CSS later)
const modalStyle = {
  background: '#fff',
  padding: '20px',
  borderRadius: '10px',
  width: '300px',
  margin: '20px auto',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
};

export default InviteModal;
