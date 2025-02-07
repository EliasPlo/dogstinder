// Importit
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Komponentit
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
// Sivut
import Home from './pages/Home';
import MapView from './pages/MapView';
import Events from './pages/Events';
import Settings from './pages/Settings';
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import Signup from './pages/Signup';

// App-komponentti
const App = () => {
  return (
    <Router>
      <div className="app">
        {/* Navigointikomponentti */}
        <Navbar />

        {/* Reititykselle määritellyt sivut */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map/parks" element={<MapView type="puistot" />} />
          <Route path="/map/vets" element={<MapView type="elaainlaakarit"/>} />
          <Route path="/map/events" element={<MapView type="tapahtumat"/>} />
          <Route path="/events" element={<Events />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/admin' element={<AdminPanel />} />
        </Routes>

        {/* Alatunniste */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
