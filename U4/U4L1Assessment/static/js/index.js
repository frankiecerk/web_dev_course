import { updateNamesList } from "/static/js/utils.js";

document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.getElementById("name-input");

  // Function to fetch names from the API
  const getNames = async () => {
    try {
      const response = await axios.get("/api/names");
      updateNamesList(response.data.names);
    } catch (error) {
      console.error("Error fetching names:", error);
    }
  };

  // Function to add a new name via the API
  const addName = async (newName) => {
    try {
      const response = await axios.post("/api/names", { name: newName });
      updateNamesList(response.data.names);
    } catch (error) {
      console.error("Error adding name:", error);
    }
  };

  // Event listener for the input field
  nameInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      const newName = event.target.value;
      if (newName) {
        addName(newName);
        event.target.value = ""; // Clear the input field
      }
    }
  });

  // Initial fetch of names when the page loads
  getNames();
});
