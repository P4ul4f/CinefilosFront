import React from 'react';
import './Spinner.css';
import RingLoader from 'react-spinners/RingLoader'

const Spinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner-container">
        <RingLoader color="#7c36d6"/>
      </div>
    </div>
  );
};

export default Spinner;
