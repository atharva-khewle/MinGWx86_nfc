import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="container">
      <div className="scroll-container">
        <div className="scroll-item">Item 1</div>
        <div className="scroll-item">Item 2</div>
        <div className="scroll-item">Item 3</div>
        <div className="scroll-item">Item 4</div>
        <div className="scroll-item">Item 5</div>
        <div className="scroll-item">Item 6</div>
      </div>
      <div className="scroll-indicator">
        <h1>Scroll Down to See More Items</h1>
      </div>
    </div>
  );
};

export default LandingPage;