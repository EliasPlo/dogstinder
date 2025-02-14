require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const argon2 = require("argon2");

const app = express();
app.use(express.json());
app.use(cors());

// Yhdistetään MongoDB-tietokantaan
mongoose
  .connect(process.env.MONGO_URI, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

// Määritellään käyttäjämalli
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
});
const User = mongoose.model("User", UserSchema);

// Rekisteröinti
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const salt = await argon2.generateSalt();
    const hash = await argon2.hash(password);

    const newUser = new User({ username, hash, salt });
    await newUser.save();

    res.json({ success: true, message: "Rekisteröinti onnistui" });
  } catch (error) {
    res.status(500).json({ error: "Käyttäjänimi on jo käytössä tai virhe rekisteröinnissä" });
  }
});

// Kirjautuminen
app.post("/verify", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ success: false, message: "Käyttäjää ei löytynyt" });
    }

    const isMatch = await argon2.verify(user.hash, password);
    res.json({ success: isMatch });
  } catch (error) {
    res.status(500).json({ error: "Virhe kirjautumisessa" });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Serveri pyörii portissa ${process.env.PORT || 5000}`);
});
