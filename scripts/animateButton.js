//File for managing the button animation

export function animateButton(button, message) {
  // Lowercase and Uppercase alphabets as strings
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const reverseLower = "zyxwvutsrqponlmkjihgfedcba";
  const reverseUpper = "ZYXWVUTSRQPONMLKJIHGFEDCBA";
  let shiftValue = Math.floor(Math.random() * 8 + 1); //Random 1-8

  //Helper function for going forward in the alphabet
  function shiftLetterForward(char) {
    let alphabet = ""; //Variable to store the alphabet

    //Check if the character is lowercase, uppercase, or neither
    if (lowercase.includes(char)) {
      alphabet = lowercase;
    } else if (uppercase.includes(char)) {
      alphabet = uppercase;
    } else {
      return char; //Return the character if it is not in the alphabet
    }
    const index = alphabet.indexOf(char); //Find the index of the character in the alphabet
    const newIndex = (index + shiftValue) % alphabet.length; //Shift the index by the shift value
    return alphabet[newIndex]; //Return the new character
  }

  //Helper function for going backwardsin in the alphabet
  function shiftLetterBackward(char) {
    let alphabet = ""; //Variable to store the alphabet

    //Check if the character is lowercase, uppercase, or neither
    if (lowercase.includes(char)) {
      alphabet = reverseLower;
    } else if (uppercase.includes(char)) {
      alphabet = reverseUpper;
    } else {
      return char; //Return the character if it is not in the alphabet
    }
    const index = alphabet.indexOf(char); //Find the index of the character in the alphabet
    const newIndex = (index + shiftValue) % alphabet.length; //Shift the index by the shift value
    return alphabet[newIndex]; //Return the new character
  }

  let isEncrypting = true; //Flag to track whether we are encrypting or decrypting
  let isDecrypting = false; //Flag to mark decryption and end loop
  let index = 0; //Index to keep track of current character
  let currentText = message.split("");

  // Function to animate button text letter by letter
  // Function to animate button text letter by letter
  function updateButtonText() {
    if (index < message.length) {
      // Only update the current index character
      currentText[index] = isEncrypting
        ? shiftLetterForward(currentText[index])
        : shiftLetterBackward(currentText[index]);

      // Update the button text
      button.textContent = currentText.join("");

      // Increment the index to process the next character
      index++;

      // Continue the animation
      setTimeout(() => {
        updateButtonText();
      }, 20);
    } else if (isEncrypting) {
      isEncrypting = false; // Switch to decryption phase
      isDecrypting = true;
      index = 0; // Reset index for decryption
      setTimeout(() => {
        updateButtonText();
      }, 20); // Start decryption after a delay
    } else if (isDecrypting) {
      return; //Ends the loop after decryption
    }
  } //End updateButtonText()
  updateButtonText();
} //End animateButton()
