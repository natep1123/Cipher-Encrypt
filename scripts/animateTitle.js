// File to manage the title animation

export function animateTitle() {
  // Alphabets for shifting
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Initial setup
  const title = document.querySelector("h1");
  const originalTitle = title.textContent;
  let shiftValue = 1; // Start at 1, up to 12
  let index = 0; // Track current character
  let lastFrame = performance.now(); // For throttling

  // Shift a letter up the alphabet
  function shiftLetter(char) {
    const alphabet = lowercase.includes(char)
      ? lowercase
      : uppercase.includes(char)
      ? uppercase
      : null;
    if (!alphabet) return char; // Return unchanged if not a letter
    const currentIndex = alphabet.indexOf(char);
    const newIndex = (currentIndex + shiftValue) % alphabet.length;
    return alphabet[newIndex];
  }

  // Animate title letter by letter
  function updateTitle(timestamp) {
    const deltaTime = timestamp - lastFrame;
    if (deltaTime > 100) {
      // Throttle to ~100ms per update (similar to original)
      let updatedTitle = originalTitle
        .split("")
        .map((char, i) => (i <= index ? shiftLetter(char) : char))
        .join("");
      title.textContent = updatedTitle; // Update DOM

      index++;
      if (index < originalTitle.length) {
        requestAnimationFrame(updateTitle); // Next letter
      } else {
        index = 0; // Reset for next cycle
        shiftValue = shiftValue < 12 ? shiftValue + 1 : 1; // Increment or reset shift
        requestAnimationFrame(updateTitle); // Restart cycle
      }
      lastFrame = timestamp; // Update last frame time
    } else {
      requestAnimationFrame(updateTitle); // Wait for next frame
    }
  }

  // Start animation
  requestAnimationFrame(updateTitle);
}
