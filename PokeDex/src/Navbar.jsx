import React, { useState } from 'react';
import './Navbar.css';

function Navbar({ isDarkMode, toggleDarkMode, navigateTo, currentPage }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleNavigation = (page) => {
    navigateTo(page);
    setIsExpanded(false); // Close mobile menu after clicking
  };
  
  const handleRandomPokemon = () => {
    // We'll implement this in the Pokemon component
    navigateTo('home');
    setIsExpanded(false);
    
    // This will trigger the random Pokémon selection in the Pokemon component
    // We use a custom event to communicate between components
    const event = new CustomEvent('randomPokemon');
    window.dispatchEvent(event);
  };
  
  return (
    <nav className={`navbar navbar-expand-lg ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <div className="container">
        <a className="navbar-brand" href="#home" onClick={() => handleNavigation('home')}>
          <img 
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" 
            alt="Pokéball" 
            width="30" 
            height="30" 
            className="d-inline-block align-text-top me-2"
          />
          Pokémon Library
        </a>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setIsExpanded(!isExpanded)}
          aria-controls="navbarContent" 
          aria-expanded={isExpanded} 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${isExpanded ? 'show' : ''}`} id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a 
                className={`nav-link ${currentPage === 'home' ? 'active' : ''}`} 
                href="#home"
                onClick={() => handleNavigation('home')}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="#random"
                onClick={handleRandomPokemon}
              >
                Random Pokémon
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${currentPage === 'about' ? 'active' : ''}`} 
                href="#about"
                onClick={() => handleNavigation('about')}
              >
                About
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`} 
                href="#contact"
                onClick={() => handleNavigation('contact')}
              >
                Contact
              </a>
            </li>
          </ul>
          
          <div className="d-flex">
            <button 
              className={`btn ${isDarkMode ? 'btn-light' : 'btn-dark'}`} 
              onClick={toggleDarkMode}
            >
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;