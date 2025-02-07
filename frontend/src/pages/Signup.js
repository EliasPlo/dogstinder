import React, { useState } from 'react';
import { register } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');
    const history = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await register(username, password, role);
            history.push('/login'); // Ohjataan kirjautumissivulle rekisteröinnin jälkeen
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
            </form>
        </div>
    );
};

export default Signup;
