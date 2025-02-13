import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h3" gutterBottom>
        Tervetuloa Koira.png!
      </Typography>
      <Typography variant="h6" >
        Paras sovellus koiranomistajille löytääkseen puistoja, tapahtumia ja paljon muuta.
      </Typography>
      <Typography variant="body1" >
        Rekisteröidy tai kirjaudu sisään aloittaaksesi!
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
        <Button variant="contained" color="primary" component={Link} to="/signup">
          Sign Up
        </Button>
        <Button variant="outlined" color="primary" component={Link} to="/login">
          Log In
        </Button>
      </Box>
      <br /><br /><br />
    </Container>
  );
};

export default Home;
