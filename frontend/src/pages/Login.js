import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

const API_URL = 'http://localhost:5000'; // Update with your backend URL

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const login = async (username, password) => {
        try {
            const response = await axios.post(`${API_URL}/login`, { username, password });
            return response.data;
        } catch (error) {
            console.error('Error logging in:', error.response?.data || error);
            throw error;
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await login(username, password);
            localStorage.setItem('token', data.token); // Save JWT token to localStorage
            navigate('/profile'); // Navigate to profile page
        } catch (err) {
            setError('Invalid credentials or server error');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{  display: 'flex',  flexDirection: 'column',  alignItems: 'center',  marginTop: 8,  padding: 3,  backgroundColor: 'background.paper',  borderRadius: 1,  boxShadow: 3 }} >
                <Typography variant="h5" gutterBottom>
                    Login
                </Typography>
                {error && (
                    <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
                        {error}
                    </Typography>
                )}
                <form onSubmit={handleLogin} style={{ width: '100%' }}>
                    <TextField label="Username" variant="outlined" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <TextField label="Password" variant="outlined" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
                        Login
                    </Button>
                    <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
                        Eikö sinulla ole käyttäjää? <a href='/signup'>Rekisteröinti</a>
                    </Typography>
                </form>
            </Box>
        </Container>
    );
};

export default Login;
