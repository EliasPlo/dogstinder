// src/components/Settings.js
import React, { useState } from 'react';
import axios from 'axios';

const Settings = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Not authenticated');
      return;
    }

    try {
      await axios.put(
        '/api/user/profile', // You may need to implement this PUT endpoint
        { username, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Profile updated');
    } catch (err) {
      setError('Failed to update settings');
    }
  };

  return (
    <div>
      <h2>Settings</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="New Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Settings;
