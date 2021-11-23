import React from 'react';
import ReactDOM from 'react-dom';
import LocationMap from './locationMap';


function renderMap(responsiveGridEl) {
  responsiveGridEl.querySelectorAll("[id^='locationMap']:not([data-map-processed='true'])").forEach(function (map) {
      // Mark the content fragment as processed, since we don't want to accidentally apply the JS adjustments multiple times
      map.setAttribute("data-map-processed", true);

      ReactDOM.render(
        <React.StrictMode>
          <LocationMap />
        </React.StrictMode>,
        map
      );
  });
}

document.addEventListener("DOMContentLoaded", function(event) { 
  document.querySelectorAll(".responsivegrid").forEach(function(responsiveGridEl) {
    // Initialize the component styles on page load
    renderMap(responsiveGridEl);
  
     // Attach a mutation observer to handle drag and drop in page editor and the styling/authoring of components
     // This is only required in the context of authoring, and could be split out to only execute in the context of the Page Editor.
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === "childList") {
              renderMap(responsiveGridEl);
            }
        });
    });
  
    // Observe changes to nodes under each responsive grid on the page
    observer.observe(responsiveGridEl, 
        { attributes: false, childList: true, characterData: false, subtree: true });
  });
});