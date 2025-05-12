import './App.css';
import Pokemon from './pokemon.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Navbar from './Navbar.jsx';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedPage, setSelectedPage] = useState('home');
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  const navigateTo = (page) => {
    setSelectedPage(page);
  };
  
  // Function to render the current page based on selectedPage state
  const renderPage = () => {
    switch (selectedPage) {
      case 'home':
        return <Pokemon />;
      case 'about':
        return (
          <div className="container mt-5">
            <h2>About Pokémon Library</h2>
            <p>Welcome to the Pokémon Library, your ultimate source for Pokémon information!</p>
            <p>This application allows you to browse through various Pokémon, view their details, and check current market prices for their trading cards.</p>
            <p>Data is sourced from the official PokéAPI and the Pokémon TCG API.</p>
            <h3>Features:</h3>
            <ul>
              <li>Browse all Pokémon with colorful type-based cards</li>
              <li>Search and filter Pokémon by name and type</li>
              <li>View detailed information about each Pokémon</li>
              <li>Check current market prices for Pokémon cards</li>
              <li>View and explore Pokémon trading cards</li>
              <li>Toggle between light and dark mode for comfortable viewing</li>
            </ul>
          </div>
        );
      case 'contact':
        return (
          <div className="container mt-5">
            <h2>Contact Us</h2>
            <p>Have questions or suggestions? Reach out to us!</p>
            <form className="mt-4">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" placeholder="Your name" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" placeholder="your.email@example.com" />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea className="form-control" id="message" rows="5" placeholder="Your message"></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        );
      default:
        return <Pokemon />;
    }
  };
  
  return (
    <div className={`App min-h-screen ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Navbar 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
        navigateTo={navigateTo}
        currentPage={selectedPage}
      />
      <div className="main-content">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;