//File for managing the Cipher encryption and decryption functions

//ENCRYPTION FUNCTION
export function encrypt(message, shiftValue) {
  //initialize alphabet and upperAlphabet
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  //Function to encrypt a letter with a shift value
  function encryptLetter(letter, shiftValue) {
    const index = alphabet.indexOf(letter.toLowerCase());
    let newIndex;

    // Check for negatve shift value for reversal of shift direction; use modulos to wrap around the alphabet and readd alphabet length if shift direction reversed
    if (shiftValue < 0) {
      newIndex = (index + shiftValue + alphabet.length) % alphabet.length;
    } else if (shiftValue >= 0) {
      newIndex = (index + shiftValue) % alphabet.length;
    }
    //Handle negative index possibility
    if (newIndex < 0) {
      //"Add" newIndex to subtract --> +newIndex == -(newIndex*-1)
      newIndex = alphabet.length + newIndex;
    }
    // Return uppercase letter if it was originally uppercase
    if (letter === letter.toUpperCase()) {
      return upperAlphabet[newIndex];
    }
    return alphabet[newIndex];
  }

  //Introduce empty variables for new message and counter
  let encryptedMessage = "";
  let count = 0;

  //Loop over each character of the message using encryptLetter function
  for (let i = 0; i < message.length; i++) {
    // Conditionals with changing shift directions
    //Forward shift first letter
    if (count === 0) {
      //Check if character is in alphabet; if not, pass it on to encrypted message and start next iteration of the loop
      if (!alphabet.includes(message.toLowerCase()[i])) {
        encryptedMessage += message[i];
        count++;
        continue;
      }
      encryptedMessage += encryptLetter(message[i], shiftValue);
      count++;
    }
    //Backward shift for second letter
    else if (count === 1) {
      //Check if character is in alphabet; if not, pass it on to encrypted message and start next iteration of the loop
      if (!alphabet.includes(message.toLowerCase()[i])) {
        encryptedMessage += message[i];
        count = 0;
        continue;
      }
      //Reverse shift direction and add second encyrpted letter
      shiftValue = shiftValue * -1;
      encryptedMessage += encryptLetter(message[i], shiftValue);
      //Add random letter after the encrypted letter
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      //Make 1/3 chance that random letter is uppercase
      const randomNum = Math.floor(Math.random() * 3) + 1;
      if (randomNum === 2) {
        encryptedMessage += upperAlphabet[randomIndex];
        count = 0;
      } else {
        encryptedMessage += alphabet[randomIndex];
        count = 0;
      }
    }
  }
  return encryptedMessage;
}

//DECRYPTION FUNCTION
export function decrypt(encryptedMessage, shiftValue) {
  //initialize alphabet and upperAlphabet
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  //Function to decrypt a letter with a shift value
  function decryptLetter(letter, shiftValue) {
    const index = alphabet.indexOf(letter.toLowerCase());
    let newIndex = (index - shiftValue + alphabet.length) % alphabet.length;
    //Handle negative index possibility
    if (newIndex < 0) {
      //"Add" newIndex to subtract --> +newIndex == -(newIndex*-1)
      newIndex = alphabet.length + newIndex;
    }
    // Return uppercase letter if it was originally uppercase
    if (letter === letter.toUpperCase()) {
      return upperAlphabet[newIndex];
    }
    return alphabet[newIndex];
  }

  //Introduce empty variables for new message and counter
  let decryptedMessage = "";
  let count = 0;

  //Loop over each character of the encrypted message using decryptLetter function
  for (let i = 0; i < encryptedMessage.length; i++) {
    //Conditionals with changing shift directions
    if (count === 0) {
      //Check if character is in alphabet; if not, pass it on to decrypted message and start next iteration of the loop
      if (!alphabet.includes(encryptedMessage.toLowerCase()[i])) {
        decryptedMessage += encryptedMessage[i];
        count++;
        continue;
      }
      //Add first decrypted letter
      decryptedMessage += decryptLetter(encryptedMessage[i], shiftValue);
      count++;
    } else if (count === 1) {
      //Check if character is in alphabet; if not, pass it on to decrypted message and start next iteration of the loop
      if (!alphabet.includes(encryptedMessage.toLowerCase()[i])) {
        decryptedMessage += encryptedMessage[i];
        count = 0;
        continue;
      }
      //reverse shift direction and add second decrypted letter
      shiftValue = shiftValue * -1;
      decryptedMessage += decryptLetter(encryptedMessage[i], shiftValue);
      count = 0;
      //Incriment i to skip the random letters
      i++;
    }
  }

  return decryptedMessage;
}

//Testing function
function testCipher() {
  const shiftValue = 11;
  const test1 = `Hello Brutus, meet me at the high gardens.`;
  const test2 = `I wrote this code to encrypt messages, but but non-letters like ! stay unchanged. Cool, right?!`;

  let encrypt1 = encrypt(test1, shiftValue);
  let encrypt2 = encrypt(test2, shiftValue);
  let decrypt1 = decrypt(encrypt1, shiftValue);
  let decrypt2 = decrypt(encrypt2, shiftValue);

  console.log(`
  Functions:
encrypt(message, shiftValue)
decrypt(encryptedMessage, shiftValue)`);

  console.log(`
  Original: 
"${test1}" 

  Encrypted (shiftValue = 11); 
"${encrypt1}"

  Decrypted: 
"${decrypt1}"`);

  console.log(`
  Orignal: 
"${test2}"

  Encrypted (shiftValue = 11): 
"${encrypt2}"

  Decrypted: 
"${decrypt2}"`);
}
//testCipher();
