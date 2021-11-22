import React from 'react';
import ReactDOM from 'react-dom';
import GoogleMap from './GoogleMap';


document.addEventListener("DOMContentLoaded", function(event) { 
  var element =  document.getElementById('google-map');
  if (typeof(element) != 'undefined' && element != null)
  {
    console.log("Map found");
    ReactDOM.render(
      <React.StrictMode>
        <GoogleMap />
      </React.StrictMode>,
      document.getElementById('google-map')
    );
  } 
});