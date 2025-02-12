import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000'; // Muuta tarvittaessa backendin osoitteen mukaan

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
            localStorage.setItem('token', data.token); // Tallennetaan JWT localStorageen
            navigate('/profile'); // Ohjataan käyttäjä profiilisivulle
        } catch (err) {
            setError('Invalid credentials or server error');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
                <p>Eikö sinulla ole käyttäjää? <a href='/signup'>Rekisteröinti</a></p>
            </form>
        </div>
    );
};

export default Login;
