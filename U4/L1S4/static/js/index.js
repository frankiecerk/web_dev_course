document.addEventListener("DOMContentLoaded", async function () {
  // Function to fetch users from the API and display them
  const response = await axios.get("/api/users");

  const users = response.data.users;

  const userGrid = document.getElementById("grid");
  userGrid.innerHTML = ""; // Clear the grid

  // Loop through the users and create a card for each
  users.forEach((user) => {
    const userCard = document.createElement("div");
    userCard.className = "card";

    userCard.innerHTML = `
                    <h2>${user.name}</h2>
                    <p>Age: ${user.age}</p>
                    <p>Hobbies: ${user.hobbies.join(", ")}</p>
                `;

    userGrid.appendChild(userCard);
  });
});
