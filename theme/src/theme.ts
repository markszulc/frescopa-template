
// Stylesheets
import "./theme.scss";
import "./resources/images/favicon.png"

// Component Javascript
import "./components/experiencefragment/change_flag.js";
import "./components/contentfragment/contentfragment.js";
import "./components/form-options/form_dropdown.js";
import "./components/progressbar/progressbar.js";

console.log("Calling ContextHub");
var user = ContextHub.getStore("profile")
var displayName = user.getItem("displayName")
console.log("Display Name =  " + displayName);
var geo = ContextHub.getStore("geolocation")
var yourcity = "Now delivering to " + geo.getItem("address/city");
console.log("City =  " + yourcity);

