const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(bodyParser.json()); 

// MongoDB-yhteys
mongoose.connect(process.env.MONGO_URI, { 
// useNewUrlParser: 
// true, useUnifiedTopology: true 
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Malleja

// Käyttäjä-malli
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: String,
});

const User = mongoose.model('User', UserSchema);

// Koira-malli (yksi käyttäjä voi omistaa useamman koiran)
const DogSchema = new mongoose.Schema({
  name: String,
  breed: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Yhteys käyttäjään
});

const Dog = mongoose.model('Dog', DogSchema);

// Tapahtuma-malli
const EventSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: Date,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Tapahtuman luoja
});

const Event = mongoose.model('Event', EventSchema);

// Viesti-malli (chat-viestit)
const MessageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', MessageSchema);

const ParkSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

const Park = mongoose.model('Park', ParkSchema);

module.exports = Park;

// Reitit ja kontrollerit

// Rekisteröityminen
app.post('/api/register', async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // Tarkistetaan onko sähköposti jo käytössä
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });

    // Salasanan kryptaus
    const hashedPassword = await bcrypt.hash(password, 10);

    // Uusi käyttäjä
    const newUser = new User({
      email,
      password: hashedPassword,
      username,
    });

    // Tallennetaan käyttäjä tietokantaan
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Kirjautuminen
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Tarkistetaan salasana
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Luodaan JWT token
    const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Käyttäjän profiili (vaatii kirjautumisen)
app.get('/api/user/profile', async (req, res) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    // Verifioidaan token
    const decoded = jwt.verify(token, 'secretkey');
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Puistojen reitit

// Hae kaikki puistot
app.get('/api/parks', async (req, res) => {
  try {
    const parks = await Park.find();
    res.json(parks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching parks' });
  }
});

// Lisää uusi puisto
app.post('/api/parks', async (req, res) => {
  const { lat, lng } = req.body;

  try {
    const newPark = new Park({
      lat,
      lng,
    });

    await newPark.save();
    res.status(201).json(newPark);
  } catch (error) {
    res.status(500).json({ message: 'Error saving park' });
  }
});


// Tapahtumat (hakee kaikki tapahtumat)
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find().populate('userId', 'username'); // Hakee tapahtumat ja käyttäjän tiedot
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events' });
  }
});

// Tapahtuman luonti (admin-käyttäjälle)
app.post('/api/events', async (req, res) => {
  const { name, description, date, userId } = req.body;

  try {
    const newEvent = new Event({
      name,
      description,
      date,
      userId, // Tapahtuman luoja
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event created' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating event' });
  }
});

// Koiran lisäys
app.post('/api/dogs', async (req, res) => {
  const { name, breed, userId } = req.body;

  try {
    const newDog = new Dog({
      name,
      breed,
      userId,
    });

    await newDog.save();
    res.status(201).json({ message: 'Dog added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding dog' });
  }
});

// Viestit (chat)
app.get('/api/messages', async (req, res) => {
  const { userId } = req.query;

  try {
    const messages = await Message.find({ $or: [{ senderId: userId }, { receiverId: userId }] })
      .populate('senderId', 'username')
      .populate('receiverId', 'username');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

// Lähetä viesti
app.post('/api/messages', async (req, res) => {
  const { senderId, receiverId, content } = req.body;

  try {
    const newMessage = new Message({
      senderId,
      receiverId,
      content,
    });

    await newMessage.save();
    res.status(201).json({ message: 'Message sent' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message' });
  }
});

// Käynnistetään serveri
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
