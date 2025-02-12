import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminEdit = () => {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [editMode, setEditMode] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);

    const token = localStorage.getItem('token'); // Assume the token is saved in localStorage

    useEffect(() => {
        if (token) {
            // Fetch the users if the admin is logged in
            axios.get('http://localhost:5000/api/admin/users', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
        }
    }, [token]);

    const handleAddUser = () => {
        if (username && password && role) {
            const newUser = { username, password, role };
            axios.post('http://localhost:5000/register', newUser)
                .then(response => {
                    setUsers([...users, newUser]); // Add the new user to the list
                    setUsername('');
                    setPassword('');
                    setRole('user');
                    alert('User added successfully');
                })
                .catch(error => {
                    console.error('Error adding user:', error);
                });
        }
    };

    const handleEditUser = () => {
        if (username && password && role) {
            const updatedUser = { username, password, role };
            axios.put(`http://localhost:5000/api/admin/users/${editingUserId}`, updatedUser, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(response => {
                const updatedUsers = users.map(user =>
                    user.username === editingUserId ? updatedUser : user
                );
                setUsers(updatedUsers);
                setUsername('');
                setPassword('');
                setRole('user');
                setEditMode(false);
                alert('User updated successfully');
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
        }
    };

    const handleDeleteUser = (id) => {
        axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => {
            const updatedUsers = users.filter(user => user.username !== id);
            setUsers(updatedUsers);
            alert('User deleted successfully');
        })
        .catch(error => {
            console.error('Error deleting user:', error);
        });
    };

    const handleEditClick = (user) => {
        setUsername(user.username);
        setPassword(user.password);
        setRole(user.role);
        setEditMode(true);
        setEditingUserId(user.username); // For editing purposes, use the username or user ID
    };

    return (
        <div>
            <h1>Admin Panel - Manage Users</h1>
            
            <div>
                <h2>{editMode ? 'Edit User' : 'Add New User'}</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="eventuser">Event User</option>
                    <option value="admin">Admin</option>
                </select>

                <button onClick={editMode ? handleEditUser : handleAddUser}>
                    {editMode ? 'Update User' : 'Add User'}
                </button>
            </div>

            <div>
                <h2>Existing Users</h2>
                <ul>
                    {users.map(user => (
                        <li key={user.username}>
                            <span>{user.username} ({user.role})</span>
                            <button onClick={() => handleEditClick(user)}>Edit</button>
                            <button onClick={() => handleDeleteUser(user.username)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminEdit;
