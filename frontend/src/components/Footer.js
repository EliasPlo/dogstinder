import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#333' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Koira.png
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/">Koti</Button>
          <Button color="inherit" component={Link} to="/maps">Kartat</Button>
          <Button color="inherit" component={Link} to="/events">Tapahtumat</Button>
          <Button color='inherit' component={Link} to="/dogs/list">KoiraLista</Button>
          <Button color="inherit" component={Link} to="/profile">Profiili</Button>
          <Button color="inherit" component={Link} to="/settings">Asetukset</Button>
          <Button color="inherit" component={Link} to="/admin/auth">Admin</Button>
        </Box>
      </Toolbar>
      <Typography variant="body2" align="center" sx={{ padding: 2, backgroundColor: '#222' }}>
        &copy; 2025 Koira.png - All Rights Reserved
      </Typography>
    </AppBar>
  );
};

export default Navbar;
