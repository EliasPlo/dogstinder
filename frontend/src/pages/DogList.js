import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Card, CardContent, Typography, Container, Box } from '@mui/material';
import axios from 'axios';

const DogList = () => {
    const [dogs, setDogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDogs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/dogs');
                setDogs(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Virhe koirien hakemisessa:', error);
                setLoading(false);
            }
        };

        fetchDogs();
    }, []);

    if (loading) {
        return <Typography variant="h6">Ladataan koiria...</Typography>;
    }

    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Koirien lista
                </Typography>
                <Typography variant="body1">lisää koirasi <a href='/dogs/add'>täältä</a></Typography>
                {dogs.length === 0 ? (
                    <Typography variant="body1">Ei koiria löytynyt.</Typography>
                ) : (
                    <List>
                        {dogs.map((dog, index) => (
                            <ListItem key={index}>
                                <Card sx={{ width: '100%', mb: 2 }}>
                                    <CardContent>
                                        <Typography variant="h6">{dog.dogName}</Typography>
                                        <Typography color="textSecondary">{dog.breed}</Typography>
                                        <Typography color="textSecondary">Ikä:{dog.age} vuotta</Typography>
                                        <Typography color="textSecondary">Omistaja: {dog.username}</Typography>
                                    </CardContent>
                                </Card>
                            </ListItem>
                        ))}
                    </List>
                )}
            </Box>
        </Container>
    );
};

export default DogList;

                    

