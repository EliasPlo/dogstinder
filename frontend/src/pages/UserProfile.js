import React, { useState, useEffect } from 'react';
import { updateUserProfile } from '../services/api';

const UserProfile = () => {
    const [newName, setNewName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            await updateUserProfile(token, newName, newPassword);
            alert('Profile updated successfully');
        } catch (err) {
            setError('Error updating profile');
        }
    };

    useEffect(() => {
        // Tässä voisi kutsua API:ta, joka hakee käyttäjän tiedot
        // Esimerkiksi: setNewName(currentUser.name);
    }, []);

    return (
        <div>
            <h2>Update Profile</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleUpdateProfile}>
                <div>
                    <label>New Name</label>
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                </div>
                <div>
                    <label>New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UserProfile;
