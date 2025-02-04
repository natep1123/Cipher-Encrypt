//File to manage the title animation

export function animateTitle() {
  // Lowercase and Uppercase alphabets as strings
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let shiftValue = 1; //Initial shift value

  // Select the title element and store the original title
  const title = document.querySelector("h1");
  const staticOriginalTitle = title.textContent;
  let currentTitle = staticOriginalTitle; // Dynamic copy for animations

  let index = 0; //Index to keep track of the current character

  //Function to shift a letter up the alphabet
  function shiftLetter(char) {
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

  //Function to animate title letter by letter
  function updateTitle() {
    //The "i<=index" condition ensures that only the characters up to the current index are shifted each iteration (to create the animation effect)
    let updatedTitle = currentTitle
      .split("")
      .map((char, i) => (i <= index ? shiftLetter(char) : char))
      .join("");
    title.textContent = updatedTitle; //Update the title with the new characters
    index++; //Increment the index

    //Repeat animation until all characters are shifted
    if (index < staticOriginalTitle.length) {
      setTimeout(() => {
        updateTitle();
      }, 100); //Delay in ms
    } else {
      //Reset index and animate title again
      index = 0;
      //TIP: the 12th iteration of the loop returns the original title
      //Modify the shift value for the next animation, or reset to 1
      if (shiftValue < 12) {
        shiftValue++;
      } else {
        shiftValue = 1;
      }

      currentTitle = updatedTitle; //Update the current title

      //Repeat the animation
      setTimeout(() => {
        updateTitle();
      }, 100); //Delay in ms
    }
  } //End of updateTitle function
  updateTitle(); //Start the animation
} //End of animateTitle function
