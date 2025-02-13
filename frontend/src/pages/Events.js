import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, List, ListItem, Alert } from '@mui/material';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/markers/tapahtumat`);
        setEvents(response.data);
      } catch (err) {
        setError('Failed to fetch events');
      }
    };

    fetchEvents();
  }, []);

  return (
    <Container>
      <br />
      <Typography variant="h4" gutterBottom>
        Events
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {events.length > 0 ? (
        <List>
          {events.map((event) => (
            <ListItem key={event._id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Card sx={{ width: '100%', marginBottom: 2 }}>
                <CardContent>
                  <Typography variant="h5">{event.name}</Typography>
                  <Typography variant="body1">{event.description}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {new Date(event.date).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No events found</Typography>
      )}
      <br />
    </Container>
  );
};

export default Events;
