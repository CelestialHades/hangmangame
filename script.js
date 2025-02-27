// 1. Get DOM elements
const wordDisplay = document.getElementById('wordDisplay'); // Selects the div for the word display
const guessesLeftDisplay = document.getElementById('guessesLeft'); // Selects the div for guesses left
const guessedLettersDisplay = document.getElementById('guessedLetters'); // Selects the div for guessed letters
const letterInput = document.getElementById('letterInput'); // Selects the input field for letter guesses
const messageDisplay = document.getElementById('message'); // Selects the div for game messages

// 2. Game setup
const words = ['javascript', 'hangman', 'coding', 'challenge', 'game']; // Array of possible words to guess
let currentWord = ''; // Stores the word to be guessed
let displayWord = []; // Array to track revealed letters and underscores
let guessedLetters = []; // Array to track guessed letters
let guessesLeft = 6; // Number of incorrect guesses allowed
let gameActive = true; // Flag to control game state

// 3. Function to start a new game
function startGame() { // Defines a function to initialize or reset the game
  const randomIndex = Math.floor(Math.random() * words.length); // Picks a random index from the words array
  currentWord = words[randomIndex]; // Sets the current word to the randomly chosen one
  displayWord = Array(currentWord.length).fill('_'); // Initializes displayWord with underscores
  guessedLetters = []; // Resets the guessed letters array
  guessesLeft = 6; // Resets the number of guesses left
  gameActive = true; // Sets the game as active
  updateDisplay(); // Updates the UI with the initial state
  messageDisplay.textContent = ''; // Clears any previous messages
  letterInput.value = ''; // Clears the input field
  letterInput.focus(); // Focuses the input field for immediate typing
}

// 4. Function to update the display
function updateDisplay() { // Defines a function to refresh the UI
  wordDisplay.textContent = displayWord.join(' '); // Joins displayWord with spaces and shows it
  guessesLeftDisplay.textContent = `Guesses Left: ${guessesLeft}`; // Updates guesses left display
  guessedLettersDisplay.textContent = `Guessed Letters: ${guessedLetters.join(', ')}`; // Shows guessed letters
}

// 5. Function to guess a letter
function guessLetter() { // Defines a function to handle a letter guess
  if (!gameActive) return; // Exits if the game is not active
  
  const letter = letterInput.value.toLowerCase(); // Gets the input letter and converts to lowercase
  letterInput.value = ''; // Clears the input field after guessing
  
  if (!letter || letter.length !== 1 || !/[a-z]/.test(letter)) { // Validates the input (single letter)
    messageDisplay.textContent = 'Please enter a single letter!'; // Shows error if invalid
    return; // Exits the function
  }
  
  if (guessedLetters.includes(letter)) { // Checks if the letter was already guessed
    messageDisplay.textContent = 'You already guessed that letter!'; // Shows error if repeated
    return; // Exits the function
  }
  
  guessedLetters.push(letter); // Adds the letter to the guessed letters array
  
  if (currentWord.includes(letter)) { // Checks if the letter is in the word
    for (let i = 0; i < currentWord.length; i++) { // Loops through each character in the word
      if (currentWord[i] === letter) { // If the letter matches the current position
        displayWord[i] = letter; // Reveals the letter in the display
      }
    }
    if (!displayWord.includes('_')) { // Checks if all letters are revealed
      messageDisplay.textContent = 'You won!'; // Displays win message
      gameActive = false; // Ends the game
    }
  } else { // If the letter isn’t in the word
    guessesLeft--; // Decrements the guesses left
    if (guessesLeft === 0) { // Checks if no guesses remain
      messageDisplay.textContent = `You lost! The word was "${currentWord}"`; // Displays lose message
      gameActive = false; // Ends the game
    }
  }
  
  updateDisplay(); // Updates the UI after the guess
}

//6. function to reset game

function resetGame() {
    startGame();
}

//7. event listener for entry key
letterInput.addEventListener('keypress', (event) => {
    if (event.key === 'enter') {
        guessLetter();
    }
});

//8. initial game start

startGame();