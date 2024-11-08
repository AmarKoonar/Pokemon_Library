
import './App.css';
import Pokemon from './pokemon.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Sidebar from './sidebar.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    
    <div className={`App min-h-screen flex items-center justify-center ${isDarkMode ? 'Dark-Mode' : 'Light-Mode'}`}>
      <Pokemon />
      <Sidebar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
      
      
      
      
      
      
    </div>
    
  );
}

export default App;
