
"use strict";

(function() { 



    /**
     * This method applies the JavaScript-based "styling", or really, DOM adjustments required by the contributor style.
     * 
     * @param {*} responsiveGridEl the responsive grid element to look under for instances of content fragments that have the contributor style applied
     */
    function applyComponentStyles(responsiveGridEl) {
        responsiveGridEl.querySelectorAll(".cfofferdigitalsignage .cmp-contentfragment[data-cmp-contentfragment-model=\"frescopa/models/offer\"]:not([data-cmp-offer-processed='true'])").forEach(function (cf) {
            // Mark the content fragment as processed, since we don't want to accidentally apply the JS adjustments multiple times
            cf.setAttribute("data-cmp-offer-processed", true);
            console.log("found background image");

            // Adjust the DOM, in this case injecting an img node and settings its source to the the content fragment's picture URL
            var cfEls = cf.querySelector('.cmp-contentfragment__elements');
            var assetPath = cfEls.querySelector(".cmp-contentfragment__element--heroImage .cmp-contentfragment__element-value").innerText.trim();

            var brandStrip = document.createElement("div"); 
            brandStrip.setAttribute("class", "cmp-contentfragment__brand-strip"); 
        
            if (assetPath && assetPath.indexOf("/content/dam/") === 0) {
                cfEls.style.backgroundImage='url(' + assetPath + ')'; // specify the image path here
                cfEls.insertBefore(brandStrip, cfEls.querySelector(".cmp-contentfragment__element--headline"));
                var pictureEl = document.createElement("img"); 
                pictureEl.setAttribute("class", "cmp-contentfragment__logo"); 
				pictureEl.setAttribute("src", "/content/dam/frescopa/en/logo/frescopa-logotype-on-black.svg");
                cfEls.insertBefore(pictureEl, cfEls.querySelector(".cmp-contentfragment__brand-strip"));
            }
        });
    }

    // Since mutation observers can only watch a single node (and not a node list), we'll register a mutation observer for each responsive grid
    // on the page, as we are no sure which responsive grid a contributor-style content fragment might be added to.
    document.querySelectorAll(".responsivegrid").forEach(function(responsiveGridEl) {
        

        // Initialize the component styles on page load
        applyComponentStyles(responsiveGridEl);

         // Attach a mutation observer to handle drag and drop in page editor and the styling/authoring of components
         // This is only required in the context of authoring, and could be split out to only execute in the context of the Page Editor.
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === "childList") {
                    applyComponentStyles(responsiveGridEl);
                }
            });
        });

        // Observe changes to nodes under each responsive grid on the page
        observer.observe(responsiveGridEl, 
            { attributes: false, childList: true, characterData: false, subtree: true });
    });

})();