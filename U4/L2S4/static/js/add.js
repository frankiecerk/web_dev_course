const submitForm = async (event) => {
  event.preventDefault();

  // Collect form data
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const hobbies = document.getElementById("hobbies").value;

  // Create the user object
  const user = {
    name: name,
    age: parseInt(age),
    hobbies: hobbies,
  };

  // Send the data to the server via POST request using Axios
  await axios.post("/api/users", user);
  window.location.href = "/";
};

document.addEventListener("DOMContentLoaded", () => {
  // Add event listener to the form
  const form = document.getElementById("userForm");
  form.addEventListener("submit", submitForm);
});
