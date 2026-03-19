import React from 'react';
import '../styles/components.css'; // Will create this next

const Loader = ({ fullPage = true }) => {
  return (
    <div className={fullPage ? "loader-overlay" : "loader-container"}>
      <div className="spinner"></div>
      <p className="loader-text">Loading...</p>
    </div>
  );
};

export default Loader;
