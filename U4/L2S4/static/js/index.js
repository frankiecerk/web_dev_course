document.addEventListener("DOMContentLoaded", async function () {
  // Function to fetch users from the API and display them
  const response = await axios.get("/api/users");

  const users = response.data;

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
                    <button class="btn-edit">Edit</button>
                    <button class="btn-delete">Delete</button>
                `;

    userGrid.appendChild(userCard);

    // Add event listener for delete button
    const deleteButton = userCard.querySelector(".btn-delete");
    deleteButton.addEventListener("click", async () => {
      await axios.delete(`/api/users/${user.id}`);
      window.location.reload();
    });

    // Add event listener for edit button
    const editButton = userCard.querySelector(".btn-edit");
    editButton.addEventListener("click", () => {
      userCard.innerHTML = `
        <input type="text" id="edit-name" value="${
          user.name
        }" placeholder="Name" />
        <input type="number" id="edit-age" value="${
          user.age
        }" placeholder="Age" />
        <input type="text" id="edit-hobbies" value="${user.hobbies.join(
          ", "
        )}" placeholder="Hobbies (comma separated)" />
        <button class="btn-save">Save</button>
      `;

      const saveButton = userCard.querySelector(".btn-save");
      saveButton.addEventListener("click", async () => {
        const newName = userCard.querySelector("#edit-name").value;
        const newAge = userCard.querySelector("#edit-age").value;
        const newHobbies = userCard.querySelector("#edit-hobbies").value;

        await axios.put(`/api/users/${user.id}`, {
          name: newName,
          age: newAge,
          hobbies: newHobbies,
        });

        window.location.reload();
      });
    });
  });
});
