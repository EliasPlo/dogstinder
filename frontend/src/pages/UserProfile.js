import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [newName, setNewName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [userName, setUserName] = useState(''); // Uusi tila nimen tallentamiseen
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Haetaan nykyinen käyttäjätieto
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log("User data:", response.data); // Näyttää, mitä backend lähettää
                setUserName(response.data.name); // Tallennetaan käyttäjän nimi
                setNewName(response.data.name); // Asetetaan myös nimen päivitys kenttään
            } catch (err) {
                console.error('Error fetching user data:', err);
            }
        };
        console.log("Token:", token); 
        if (token) {
            fetchUserData();
        }
    }, [token]);

    const handleUpdateName = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:5000/update-profile`,
                { newName },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage('Name updated successfully');
            setUserName(newName); // Päivitetään myös käyttäjän nimi näyttämään uuden nimen
        } catch (err) {
            setError('Error updating name');
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        try {
            await axios.put(
                `http://localhost:5000/update-password`,
                { currentPassword, newPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage('Password updated successfully');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError('Error updating password');
        }
    };

    return (
        <div>
            <h2>Update Profile</h2>

            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Näytetään kirjautuneen käyttäjän nimi */}
            <div>
            <h3>Welcome, {userName || "Loading..."}</h3>
            </div>

            {/* Nimen muokkaus */}
            <form onSubmit={handleUpdateName}>
                <div>
                    <label>New Name</label>
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                </div>
                <button type="submit">Update Name</button>
            </form>

            {/* Salasanan päivitys */}
            <h3>Change Password</h3>
            <form onSubmit={handleUpdatePassword}>
                <div>
                    <label>Current Password</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
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
                <div>
                    <label>Confirm New Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Update Password</button>
            </form>
        </div>
    );
};

export default UserProfile;
