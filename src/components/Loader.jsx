import React from 'react';
import '../styles/Loader.css';

export default function Loader({ page }) {
  return (
    <div className="loader">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
      <h5 className="loadingText">Loading {page}</h5>
    </div>
  );
}
