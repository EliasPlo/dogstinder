// Importit
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Komponentit
import AuthForm from './components/AuthForm';

function App() {
  return (
    <Router>
        <AuthForm />
    </Router>
  );
}

export default App;
