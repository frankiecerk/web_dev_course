const { useState, useEffect } = React;

function Birds() {
  const [birds, setBirds] = useState([]);
  useEffect(() => {
    const getbirds = async () => {
      const response = await axios.get("/api/birds");
      setBirds(response.data.birds);
    };

    getbirds();
  }, []);

  const addBird = async (newBird) => {
    const response = await axios.post("/api/birds", { bird: newBird });
    setBirds(response.data.birds);
  };

  return (
    <div classbird="App">
      Birds
      <Names names={birds} />
      <input
        type="text"
        id="bird"
        placeholder="Add bird bird"
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            addBird(event.target.value);
            event.target.value = "";
          }
        }}
      />
    </div>
  );
}

const container = document.getElementById("content");
const root = ReactDOM.createRoot(container);
root.render(<Birds />);
