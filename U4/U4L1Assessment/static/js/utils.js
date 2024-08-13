const namesList = document.getElementById("names-list");

// Function to update the UI with the list of names
export const updateNamesList = (names) => {
  namesList.innerHTML = "";
  names.forEach((name) => {
    const listItem = document.createElement("li");
    listItem.textContent = name;
    namesList.appendChild(listItem);
  });
};
