import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000'; // Muuta tarvittaessa backendin osoitteen mukaan

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
            navigate('/login'); // Ohjataan kirjautumissivulle rekisteröinnin jälkeen
        } catch (err) {
            setError('Error during registration');
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSignup}>
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
                <div>
                    <label>Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="user">User</option>
                        <option value="eventuser">Event User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit">Sign Up</button>
                <p>Onko sinulla jo käyttäjä? <a href='/login'>Kirjaudu sisään</a></p>
            </form>
        </div>
    );
};

export default Signup;
