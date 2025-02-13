import React from 'react';
import { Container, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Maps = () => {
  return (
    <Container sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Kartat
      </Typography>
      <List>
        <ListItem button component={Link} sx={{ textAlign: 'center', mt: 1 }} to="/map/parks">
          <ListItemText primary="Puistot" />
        </ListItem>
        <ListItem button component={Link} sx={{ textAlign: 'center', mt: 1 }} to="/map/vets">
          <ListItemText primary="Eläinlääkärit" />
        </ListItem>
        <ListItem button component={Link} sx={{ textAlign: 'center', mt: 1 }} to="/map/events">
          <ListItemText primary="Tapahtumat" />
        </ListItem>
      </List>
    </Container>
  );
};

export default Maps;
