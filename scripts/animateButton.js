// File for managing the button animation
export function animateButton(button, message) {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const reverseLower = "zyxwvutsrqponmlkjihgfedcba";
  const reverseUpper = "ZYXWVUTSRQPONMLKJIHGFEDCBA";
  const shiftValue = Math.floor(Math.random() * 8 + 1); // Random 1-8

  // Shift forward in alphabet
  function shiftLetterForward(char) {
    const alphabet = lowercase.includes(char)
      ? lowercase
      : uppercase.includes(char)
      ? uppercase
      : null;
    if (!alphabet) return char;
    const index = alphabet.indexOf(char);
    return alphabet[(index + shiftValue) % alphabet.length];
  }

  // Shift backward in alphabet
  function shiftLetterBackward(char) {
    const alphabet = lowercase.includes(char)
      ? reverseLower
      : uppercase.includes(char)
      ? reverseUpper
      : null;
    if (!alphabet) return char;
    const index = alphabet.indexOf(char);
    return alphabet[(index + shiftValue) % alphabet.length];
  }

  // Disable button to prevent spam clicks
  button.disabled = true;

  let isEncrypting = true; // Start with encryption
  let isDecrypting = false; // Track decryption
  let index = 0; // Current character
  let currentText = message.split(""); // Working array
  let lastFrame = performance.now(); // For throttling

  // Animate button text
  function updateButtonText(timestamp) {
    const deltaTime = timestamp - lastFrame;
    if (deltaTime > 40) {
      // Throttle to ~25 FPS (~40ms)
      if (index < message.length) {
        currentText[index] = isEncrypting
          ? shiftLetterForward(currentText[index])
          : shiftLetterBackward(currentText[index]);
        button.textContent = currentText.join("");
        index++;
      } else if (isEncrypting) {
        isEncrypting = false;
        isDecrypting = true;
        index = 0; // Reset for decryption
      } else if (isDecrypting) {
        button.disabled = false; // Re-enable button when done
        return; // End animation
      }
      lastFrame = timestamp;
    }
    requestAnimationFrame(updateButtonText); // Keep looping
  }

  // Start animation
  requestAnimationFrame(updateButtonText);
}
