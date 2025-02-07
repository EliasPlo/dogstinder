import axios from 'axios';

const API_URL = 'http://localhost:5000';  // Muuta, jos backend toimii toisessa portissa

// Rekisteröinti
export const register = async (username, password, role) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { username, password, role });
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error.response?.data || error);
        throw error;
    }
};

// Kirjautuminen
export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error.response?.data || error);
        throw error;
    }
};

// Käyttäjätiedon päivittäminen (UserProfile)
export const updateUserProfile = async (token, newName, newPassword) => {
    try {
        const response = await axios.put(`${API_URL}/update-profile`, { newName, newPassword }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating profile:', error.response?.data || error);
        throw error;
    }
};
