//File for managing imports and exports of the CaesarCipher module

//Import the setupEventListeners function from the events.js file
import { setupEventListeners } from "./events.js";

//Import the animateTitle function from the title.js file
import { animateTitle } from "./animateTitle.js";

// Initialize when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  setTimeout(() => {
    animateTitle();
  }, 2000); //Delay title animation
});
