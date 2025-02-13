import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const API_URL = 'http://localhost:5000'; // Update with your backend URL

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const register = async (username, password, role) => {
        try {
            const response = await axios.post(`${API_URL}/register`, { username, password, role });
            return response.data;
        } catch (error) {
            console.error('Error registering user:', error.response?.data || error);
            throw error;
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await register(username, password, role);
            navigate('/login'); // Redirect to login after successful registration
        } catch (err) {
            setError('Error during registration');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8, padding: 3, backgroundColor: 'background.paper', borderRadius: 1, boxShadow: 3}}>
                <Typography variant="h5" gutterBottom>
                    Sign Up
                </Typography>
                {error && (
                    <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
                        {error}
                    </Typography>
                )}
                <form onSubmit={handleSignup} style={{ width: '100%' }}>
                    <TextField label="Username" variant="outlined" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <TextField label="Password" variant="outlined" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Role</InputLabel>
                        <Select value={role} onChange={(e) => setRole(e.target.value)} label="Role">
                            <MenuItem value="user">User</MenuItem>
                            <MenuItem value="eventuser">Event User</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
                        Sign Up
                    </Button>
                    <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
                        Onko sinulla jo käyttäjä? <a href='/login'>Kirjaudu sisään</a>
                    </Typography>
                </form>
            </Box>
        </Container>
    );
};

export default Signup;
