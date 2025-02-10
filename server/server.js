const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require("path");
const adminRoutes = require("./admin")

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
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = { username, password: hashedPassword, role };
  users.push(newUser);
  saveUsers(users);

  res.status(201).json({ message: 'User registered successfully' });
});

// Kirjautuminen
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();
  const user = users.find(u => u.username === username);

  if (!user) {
      return res.status(400).json({ message: 'User not found' });
  }
  if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ message: 'Incorrect password' });
  }
  const token = jwt.sign({ username: user.username, role: user.role }, 'secretKey', { expiresIn: '1h' });

  res.json({ message: 'Login successful', token });
});

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