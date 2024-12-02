import React from 'react';

const ThemeToggle = ({ darkMode, toggleDarkMode }) => (
  <div className="theme-toggle">
    <button onClick={toggleDarkMode}>
      {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  </div>
);

export default ThemeToggle;
