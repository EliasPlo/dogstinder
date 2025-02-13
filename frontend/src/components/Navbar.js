import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#3D8D7A' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Koira.png
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/maps">Kartat</Button>
        <Button color="inherit" component={Link} to="/events">Tapahtumat</Button>
        <Button color="inherit" component={Link} to="/dogs/list">KoiraLista</Button>
        <Button color="inherit" component={Link} to="/profile">Profiili</Button>
        <Button color="inherit" component={Link} to="/settings">Asetukset</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
