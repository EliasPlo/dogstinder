// Importit
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Komponentit
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// Sivut
import Home from './pages/Home';
import MapView from './pages/MapView';
import Maps from './pages/Maps'
import Events from './pages/Events';
import AdminPage from './pages/AdminPage'
import AdminPanel from './pages/AdminPanel';
import AdminMap from './pages/AdminMap';
import AdminM from './pages/AdminM'
import AdminEdit from './pages/AdminEdit'
import Settings from './pages/Settings';
import UserProfile from './pages/UserProfile';
import UserInfo from './pages/UserInfo';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DogAdd from './pages/DogAdd';
import DogList from './pages/DogList'

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
          <Route path='/maps' element={<Maps /> } />
          <Route path="/map/parks" element={<MapView type="puistot" />} />
          <Route path="/map/vets" element={<MapView type="elaainlaakarit"/>} />
          <Route path="/map/events" element={<MapView type="tapahtumat"/>} />
          <Route path="/events" element={<Events />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path='/u/:username' element={<UserInfo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/admin/auth' element={<AdminPage />} />
          <Route path='/admin/add' element={<AdminPanel />} />
          <Route path='/admin/maps' element={<AdminM />} />
          <Route path='/admin/edit/users' element={<AdminEdit />} />
          <Route path="/admin/map/parks" element={<AdminMap type="puistot" />} />
          <Route path="/admin/map/vets" element={<AdminMap type="elaainlaakarit"/>} />
          <Route path="/admin/map/events" element={<AdminMap type="tapahtumat"/>} />
          <Route path='/dogs/add' element={<DogAdd />} />
          <Route path='/dogs/list' element={<DogList />} />
        </Routes>

        {/* Alatunniste */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
