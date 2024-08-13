import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [names, setNames] = useState([]);
  useEffect(() => {
    const getNames = async () => {
      const response = await axios.get("/api/names");
      setNames(response.data.names);
    };

    getNames();
  }, []);

  const addName = async (newName) => {
    const response = await axios.post("/api/names", { name: newName });
    setNames(response.data.names);
  };

  return (
    <div className="App">
      Names
      <ul>
        {names?.map((name) => (
          <li>{name}</li>
        ))}
      </ul>
      <input
        type="text"
        id="name"
        placeholder="Add name"
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            addName(event.target.value);
            event.target.value = "";
          }
        }}
      />
    </div>
  );
}

export default App;
