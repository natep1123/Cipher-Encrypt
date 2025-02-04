//File for managing webpage events

//Import the encrypt and decrypt functions from the cipher.js file
import { encrypt, decrypt } from "./cipher.js";

import { animateButton } from "./animateButton.js";

export function setupEventListeners() {
  //Selecting HTML elements
  const encryptBtn = document.querySelector("#encrypt-button");
  const decryptBtn = document.querySelector("#decrypt-button");
  const copyBtn = document.querySelector("#copy-button");
  const pasteBtn = document.querySelector("#paste-button");
  const clearBtn = document.querySelector("#clear-all-button");
  const inputText = document.querySelector("#input-text");
  const outputText = document.querySelector("#output-text");
  const shift = document.querySelector("#shift");

  //Function to show temporary feedback for buttons on success
  function showTempFeedback(button, message, originalText) {
    const copyPasteIds = ["copy-button", "paste-button"];
    const encryptDecryptIds = ["encrypt-button", "decrypt-button"];
    const clearId = "clear-all-button";

    // Check if the button is one of the Copy/Paste buttons
    if (copyPasteIds.includes(button.id)) {
      button.textContent = message;
      button.classList.add("success");
    }

    // Check if the button is the Clear button
    if (clearId === button.id) {
      button.textContent = message;
      button.classList.add("success");
    }

    // Check if the button is one of the Encrypt/Decrypt buttons
    if (encryptDecryptIds.includes(button.id)) {
      button.textContent = message;
      button.classList.add("success");
      animateButton(button, message); //Animate the button
    } //End Encrypt/Decrypt button selection (if statement)

    // Reset button to original state after 1.25 seconds
    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove("success");
      button.style.backgroundColor = ""; // Reset to default
    }, 1500); // Reset after the animation cycle
  } //End showTempFeedback()

  //Event listener for the encrypt button
  encryptBtn.addEventListener("click", () => {
    //Get the input text and shift value
    const message = inputText.value;
    const shiftValue = parseInt(shift.value);
    //Check if shift value is within the range
    if (shiftValue < 1 || shiftValue > 144) {
      alert("Please enter a shift value from 1-144.");
      return;
    }
    //Encrypt the message and display the output
    outputText.value = encrypt(message, shiftValue);
    showTempFeedback(encryptBtn, "Encrypted!", "Encrypt");
  });

  //Event listener for the decrypt button
  decryptBtn.addEventListener("click", () => {
    //Get the input text and shift value
    const message = inputText.value;
    const shiftValue = parseInt(shift.value);
    //Check if shift value is within the range
    if (shiftValue < 1 || shiftValue > 144) {
      alert("Please enter a shift value from 1-144.");
      return;
    }
    //Decrypt the message and display the output
    outputText.value = decrypt(message, shiftValue);
    showTempFeedback(decryptBtn, "Decrypted!", "Decrypt");
  });

  //Event listener for the copy button
  copyBtn.addEventListener("click", () => {
    const textToCopy = outputText.value; //Select the output text
    //Copy the text to the clipboard
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        showTempFeedback(copyBtn, "Copied!", "Copy");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        alert("Failed to copy text. Please try again.");
      });
  });

  //Event Listener for the paste button to paste text from the clipboard to the input
  pasteBtn.addEventListener("click", () => {
    navigator.clipboard
      .readText()
      .then((clipText) => {
        //Paste the text from clipboard to the input
        inputText.value = clipText;
        showTempFeedback(pasteBtn, "Pasted!", "Paste");
      })
      .catch((err) => {
        console.error("Failed to paste text: ", err);
        alert("Failed to access clipboard. Please try again.");
      });
  });

  //Event listener for the clear button
  clearBtn.addEventListener("click", () => {
    showTempFeedback(clearBtn, "Cleared!", "Clear");
    //Clear the input and output text areas
    inputText.value = "";
    outputText.value = "";
    shift.value = "";
  });
}
