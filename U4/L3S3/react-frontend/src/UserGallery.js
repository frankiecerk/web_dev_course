import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./UserGallery.css";

function UserGallery() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("/api/users");
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    await axios.delete(`/api/users/${userId}`);
    setUsers(users.filter((user) => user.id !== userId));
  };

  const updateUser = async (userId, updatedUser) => {
    await axios.put(`/api/users/${userId}`, updatedUser);
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, ...updatedUser } : user
    );
    setUsers(updatedUsers);
  };

  return (
    <div className="App">
      <h1>User Cards</h1>
      <div id="grid" className="grid">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onDelete={deleteUser}
            onUpdate={updateUser}
          />
        ))}
      </div>
      <Link to="/add" className="btn">
        Add New User
      </Link>
    </div>
  );
}

function UserCard({ user, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [hobbies, setHobbies] = useState(user.hobbies.join(", "));

  const handleSave = () => {
    const updatedUser = {
      name,
      age,
      hobbies: hobbies.split(",").map((hobby) => hobby.trim()),
    };
    onUpdate(user.id, updatedUser);
    setIsEditing(false);
  };

  return (
    <div className="card">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Age"
          />
          <input
            type="text"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
            placeholder="Hobbies (comma separated)"
          />
          <button className="btn-save" onClick={handleSave}>
            Save
          </button>
        </div>
      ) : (
        <div>
          <h2>{user.name}</h2>
          <p>Age: {user.age}</p>
          <p>Hobbies: {user.hobbies.join(", ")}</p>
          <button className="btn-edit" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button className="btn-delete" onClick={() => onDelete(user.id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default UserGallery;
