import axios from "axios";

const API_URL = "http://localhost:5000";

// Rekisteröi käyttäjä
export const registerUser = async (username, hash, salt) => {
  return axios.post(`${API_URL}/register`, { username, hash, salt: Array.from(salt) });
};

// Tarkistaa käyttäjän kirjautumistiedot
export const verifyUser = async (username, password) => {
  return axios.post(`${API_URL}/verify`, { username, password });
};
