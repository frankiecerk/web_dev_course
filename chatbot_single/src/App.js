import React, { useState } from "react";
import axios from "axios";
import Message from "./components/Message";
import "./App.css";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input.trim() === "") return;

    // Add user message to state
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);

    // Clear input
    setInput("");

    // Show loading
    setLoading(true);

    // Make a request to OpenAI
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: input }],
        },
        {
          headers: {
            Authorization: `Bearer TOKEN HERE`,
            "Content-Type": "application/json",
          },
        }
      );

      // Add ChatGPT's response to state
      setMessages([
        ...newMessages,
        { text: response.data.choices[0].message.content, sender: "bot" },
      ]);
    } catch (error) {
      setMessages([...newMessages, { text: "womp womp", sender: "bot" }]);
    } finally {
      // Hide loading
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`chat-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="header">
        <h1>ChatGPT Bot</h1>
        <button onClick={toggleDarkMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <div className="messages">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} />
        ))}
        {loading && <div className="loading">Loading...</div>}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default App;
