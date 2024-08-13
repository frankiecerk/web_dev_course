import React, { useState } from "react";
import axios from "axios";
import "./AddUser.css";
import { Link } from "react-router-dom";

function AddUser() {
  console.log("ADDUSER");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [hobbies, setHobbies] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      name,
      age: parseInt(age),
      hobbies,
    };

    await axios.post("/api/users", user);
    window.location.href = "/";
  };

  return (
    <div>
      <h1>Add a New User</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />

        <label htmlFor="hobbies">Hobbies (comma separated):</label>
        <input
          type="text"
          id="hobbies"
          value={hobbies}
          onChange={(e) => setHobbies(e.target.value)}
          required
        />

        <button type="submit">Add User</button>
      </form>
      <Link to="/" className="btn">
        Go Back to Home
      </Link>
    </div>
  );
}

export default AddUser;
