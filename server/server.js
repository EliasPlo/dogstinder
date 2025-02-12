const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const path = require("path");
const adminRoutes = require("./admin");

const app = express();
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(bodyParser.json());
const DATA_FOLDER = path.join(__dirname, "data");

app.get("/api/markers/:type", (req, res) => {
    const type = req.params.type;
    const filePath = path.join(DATA_FOLDER, `${type}.json`);

    if (!fs.existsSync(filePath)) {
        return res.json([]);
    }

    const data = fs.readFileSync(filePath);
    res.json(JSON.parse(data));
});

app.post("/api/markers/:type", (req, res) => {
    const type = req.params.type;
    const filePath = path.join(DATA_FOLDER, `${type}.json`);
    let markers = [];

    if (fs.existsSync(filePath)) {
        const existingData = fs.readFileSync(filePath);
        markers = JSON.parse(existingData);
    }

    markers.push(req.body);

    fs.writeFileSync(filePath, JSON.stringify(markers, null, 2));
    res.json({ message: "Merkintä tallennettu!" });
});

app.get("/api/users", (req, res) => {
  const filePath = path.join(__dirname, "data", "users.json");
  
  fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
          return res.status(500).json({ error: "Failed to read users.json" });
      }
      
      try {
          const users = JSON.parse(data);
          res.json(users);
      } catch (parseError) {
          res.status(500).json({ error: "Invalid JSON format in users.json" });
      }
  });
});

app.use("/api/admin", adminRoutes);

function loadUsers() {
  const data = fs.readFileSync('./data/users.json');
  return JSON.parse(data);
}

function saveUsers(users) {
  fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2));
}

app.post('/register', (req, res) => {
  const { username, password, role } = req.body;

  if (!['user', 'eventuser', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
  }

  const users = loadUsers();
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = { username, password, role }; // Store password as plain text
  users.push(newUser);
  saveUsers(users);

  res.status(201).json({ message: 'User registered successfully' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();
  const user = users.find(u => u.username === username);

  if (!user) {
      return res.status(400).json({ message: 'User not found' });
  }
  if (user.password !== password) { // Compare passwords directly (no hashing)
      return res.status(400).json({ message: 'Incorrect password' });
  }
  const token = jwt.sign({ username: user.username, role: user.role }, 'secretKey', { expiresIn: '1h' });

  res.json({ message: 'Login successful', token });
});

// Update Profile Name
app.put('/update-profile', (req, res) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, 'secretKey', (err, decoded) => {
      if (err) return res.status(500).json({ message: 'Failed to authenticate token' });

      const { newName } = req.body;
      const users = loadUsers();
      const user = users.find(u => u.username === decoded.username);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      user.username = newName; // Update the user's name

      saveUsers(users);
      res.json({ message: 'Name updated successfully' });
  });
});

// Update Password
app.put('/update-password', (req, res) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, 'secretKey', (err, decoded) => {
      if (err) return res.status(500).json({ message: 'Failed to authenticate token' });

      const { currentPassword, newPassword } = req.body;
      const users = loadUsers();
      const user = users.find(u => u.username === decoded.username);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      if (user.password !== currentPassword) { // Compare passwords directly (no hashing)
          return res.status(400).json({ message: 'Incorrect current password' });
      }

      user.password = newPassword; // Update the password as plain text

      saveUsers(users);
      res.json({ message: 'Password updated successfully' });
  });
});

// Admin route
app.get('/admin', (req, res) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, 'secretKey', (err, decoded) => {
      if (err) return res.status(500).json({ message: 'Failed to authenticate token' });

      if (decoded.role !== 'admin') {
          return res.status(403).json({ message: 'Access denied' });
      }

      res.json({ message: 'Welcome, Admin!' });
  });
});

// Admin routes for user management
app.get('/api/admin/users', (req, res) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, 'secretKey', (err, decoded) => {
      if (err) return res.status(500).json({ message: 'Failed to authenticate token' });

      if (decoded.role !== 'admin') {
          return res.status(403).json({ message: 'Access denied' });
      }

      const users = loadUsers();
      res.json(users);
  });
});

// Update a user (for editing purposes)
app.put('/api/admin/users/:username', (req, res) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, 'secretKey', (err, decoded) => {
      if (err) return res.status(500).json({ message: 'Failed to authenticate token' });

      if (decoded.role !== 'admin') {
          return res.status(403).json({ message: 'Access denied' });
      }

      const { username } = req.params;
      const { password, role } = req.body;

      const users = loadUsers();
      const userIndex = users.findIndex(u => u.username === username);

      if (userIndex === -1) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Update user
      users[userIndex] = { username, password, role };
      saveUsers(users);
      res.json({ message: 'User updated successfully' });
  });
});

// Delete a user
app.delete('/api/admin/users/:username', (req, res) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, 'secretKey', (err, decoded) => {
      if (err) return res.status(500).json({ message: 'Failed to authenticate token' });

      if (decoded.role !== 'admin') {
          return res.status(403).json({ message: 'Access denied' });
      }

      const { username } = req.params;
      const users = loadUsers();
      const updatedUsers = users.filter(user => user.username !== username);

      if (updatedUsers.length === users.length) {
          return res.status(404).json({ message: 'User not found' });
      }

      saveUsers(updatedUsers);
      res.json({ message: 'User deleted successfully' });
  });
});

app.get('/eventuser', (req, res) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });
  jwt.verify(token, 'secretKey', (err, decoded) => {
      if (err) return res.status(500).json({ message: 'Failed to authenticate token' });
      if (decoded.role !== 'eventuser') {
          return res.status(403).json({ message: 'Access denied' });
      }
      res.json({ message: 'Welcome, EventUser!' });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
