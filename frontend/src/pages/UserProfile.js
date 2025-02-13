import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

const UserProfile = () => {
    const [newName, setNewName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [userName, setUserName] = useState(''); // User's name
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Fetch current user data
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log("User data:", response.data);
                setUserName(response.data.name); // Save the user's name
                setNewName(response.data.name); // Set for the name update field
            } catch (err) {
                console.error('Error fetching user data:', err);
            }
        };
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
            setUserName(newName); // Update the displayed user name
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
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: 8,
                    padding: 3,
                    backgroundColor: 'background.paper',
                    borderRadius: 1,
                    boxShadow: 3
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Update Profile
                </Typography>

                {/* Success or error message */}
                {message && <Typography variant="body2" color="success.main" sx={{ marginBottom: 2 }}>{message}</Typography>}
                {error && <Typography variant="body2" color="error.main" sx={{ marginBottom: 2 }}>{error}</Typography>}

                {/* User's name */}
                <Typography variant="h6" gutterBottom>
                    Welcome, {userName || "Loading..."}
                </Typography>

                {/* Name update form */}
                <form onSubmit={handleUpdateName} style={{ width: '100%' }}>
                    <TextField
                        label="New Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: 2 }}
                    >
                        Update Name
                    </Button>
                </form>

                {/* Password update form */}
                <Typography variant="h6" sx={{ marginTop: 3 }}>
                    Change Password
                </Typography>
                <form onSubmit={handleUpdatePassword} style={{ width: '100%' }}>
                    <TextField label="Current Password" type="password" variant="outlined" fullWidth margin="normal" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}/>
                    <TextField label="New Password" type="password" variant="outlined" fullWidth margin="normal" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                    <TextField label="Confirm New Password" type="password" variant="outlined" fullWidth margin="normal" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
                        Update Password
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default UserProfile;
