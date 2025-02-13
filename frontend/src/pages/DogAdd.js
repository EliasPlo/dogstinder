import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import axios from 'axios';

const DogAdd = () => {
    const [username, setUsername] = useState('');
    const [dogName, setDogName] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dogData = {
            username,
            dogName,
            breed,
            age,
        };

        try {
            const response = await axios.post('http://localhost:5000/add-dog', dogData);
            alert(response.data.message);
            setUsername('');
            setDogName('');
            setBreed('');
            setAge('');
        } catch (error) {
            console.error('Virhe koiran lisäämisessä:', error);
            alert('Virhe koiran lisäämisessä');
        }
    };

    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Lisää koira
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Container container spacing={2}>
                        <Container item xs={12} sm={6}>
                            <TextField
                                label="Omistajan käyttäjätunnus"
                                variant="outlined"
                                fullWidth
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Container>
                        <Container item xs={12} sm={6}>
                            <TextField
                                label="Koiran nimi"
                                variant="outlined"
                                fullWidth
                                value={dogName}
                                onChange={(e) => setDogName(e.target.value)}
                                required
                            />
                        </Container>
                        <Container item xs={12} sm={6}>
                            <TextField
                                label="Rotu"
                                variant="outlined"
                                fullWidth
                                value={breed}
                                onChange={(e) => setBreed(e.target.value)}
                                required
                            />
                        </Container>
                        <Container item xs={12} sm={6}>
                            <TextField
                                label="Ikä"
                                variant="outlined"
                                fullWidth
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                required
                                type="number"
                            />
                        </Container>
                    </Container>
                    <Box sx={{ mt: 3 }}>
                        <Button variant="contained" color="primary" type="submit">
                            Lisää koira
                        </Button>
                    </Box>
                </form>
                <Typography variant="body1">koira lista <a href='/dogs/list'>täällä</a></Typography>
            </Box>
        </Container>
    );
};

export default DogAdd;

            

