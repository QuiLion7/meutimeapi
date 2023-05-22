import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import CountryDetails from './pages/CountryDetails/CountryDetails';
import NotFound from './pages/NotFound/NotFound';
import Teams from './pages/Teams/Teams';
import Players from './pages/Players/Players';

function App() {
  return (
    <div className="App">
      <div className="background"></div>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/countrydetails/:country" element={<CountryDetails />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/players" element={<Players />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
