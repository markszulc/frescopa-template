import React from 'react';
import ReactDOM from 'react-dom';
import GoogleMap from './GoogleMap';

document.addEventListener("DOMContentLoaded", function(event) { 
  ReactDOM.render(
    <React.StrictMode>
      <GoogleMap />
    </React.StrictMode>,
    document.getElementById('google-map')
  );
});

