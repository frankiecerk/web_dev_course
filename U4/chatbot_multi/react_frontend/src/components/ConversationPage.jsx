import React, { useState } from "react";
import ConversationMenu from "./ConversationMenu";
import Chatbot from "./Chatbot";
import "../styles/ConversationPage.css";

export default function ConversationPage() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <div
      className={`conversation-page ${darkMode ? "dark-mode" : "light-mode"}`}
    >
      <div className="header">
        <div className="header">
          <h1>ChatGPT Bot</h1>
        </div>
        <button onClick={toggleDarkMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <div className="main-content">
        <ConversationMenu darkMode={darkMode} />
        <Chatbot darkMode={darkMode} />
      </div>
    </div>
  );
}
