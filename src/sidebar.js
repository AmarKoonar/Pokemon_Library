import React, { useState } from 'react';
import './Sidebar.css';

function Sidebar({ isDarkMode, toggleDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar-container">
      {/* Toggle Button */}
      <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? '→' : '←'}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <h2 className="sidebar-title">Pokemon Libary</h2>
        <ul className="sidebar-links">
          <li><button className={`btn btn-dark ${isDarkMode ? 'Dark' : 'Light'} `} onClick={() => { /* Define action */ }}>Random pokemon</button></li>
          <li><button className={`btn btn-dark ${isDarkMode ? 'Dark' : 'Light'} `}  onClick={() => { /* Define action */ }}>About</button></li>
          <li><button className={`btn btn-dark ${isDarkMode ? 'Dark' : 'Light'} `}  onClick={() => {toggleDarkMode()}}>{isDarkMode ? 'light mode' : 'dark mode'}</button></li>
          <li><button className={`btn btn-dark ${isDarkMode ? 'Dark' : 'Light'} `}  onClick={() => { /* Define action */ }}>Contact</button></li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
