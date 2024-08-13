// Get references to the DOM elements
const stringButton = document.getElementById("submitButton");
const stringValueElement = document.getElementById("stringValue");
const letterInput = document.getElementById("letterInput");

// function to get the string from the server
const getLetters = async () => {
  const response = await axios.get("/api/letters");
  stringValueElement.textContent = response.data.letters;
};

// Function to add a letter to the string - this code is correct
const addToLetters = async () => {
  // Grab only the first letter from the input field
  if (letterInput.value) {
    const letter = letterInput.value[0];
    // send a POST request with the letter in the body
    const response = await axios.post("/api/letters", { letter: letter });
    stringValueElement.textContent = response.data.letters;
  }
};

// Add event listener to the submit button to increase add a letter click
submitButton.addEventListener("click", addToLetters);

// Add initial fetch of string
document.addEventListener("DOMContentLoaded", getLetters);
