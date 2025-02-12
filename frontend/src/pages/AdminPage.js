import React, { useState } from 'react';
import userdata from '../assets/users.json';

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState('');

  // Handle login and check for user role
  const handleLogin = (e) => {
    e.preventDefault();

    // Find the user in userdata with matching username and password
    const user = userdata.find((user) => user.username === username && user.password === password);

    if (user) {
      setIsLoggedIn(true);
      setUserRole(user.role); // Set user role
      setError('');
    } else {
      setError('Incorrect username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setUserRole('');
    setError('');
  };

  return (
    <div>
      {!isLoggedIn ? (
        <div>
          <h2>Login to Admin Page</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      ) : (
        <div>
          <h2>Dashboard</h2>
          {userRole === 'admin' ? (
            <div>
              <ul>
                <li>
                  <a href='/admin/add'>ADD</a>
                </li>
                <li>
                  <a href='/admin/maps'>MAP</a>
                </li>
                <li>
                  <a href='/admin/edit/users'>USERS</a>
                </li>
              </ul>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <p>You do not have admin privileges.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
