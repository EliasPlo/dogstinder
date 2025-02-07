// src/components/Events.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events');
        setEvents(response.data);
      } catch (err) {
        setError('Failed to fetch events');
      }
    };

    fetchEvents();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Events</h2>
      {events.length > 0 ? (
        <ul>
          {events.map((event) => (
            <li key={event._id}>
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              <p>{new Date(event.date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events found</p>
      )}
    </div>
  );
};

export default Events;
