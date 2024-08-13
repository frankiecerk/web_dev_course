import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Message from "./Message";
import "../styles/Chatbot.css";
import { useParams } from "react-router-dom";

export default function Chatbot({ darkMode }) {
  const { conversationId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  console.log("CONVERSATIONID:", conversationId);
  useEffect(() => {
    const fetchMessages = async () => {
      console.log("coversationId:", conversationId);
      const response = await axios.get(`/api/conversation/${conversationId}`);
      if (response.status !== 200) {
        setMessages([]);
        navigate("/");
      } else {
        setMessages(response.data.messages);
      }
      setLoading(false);
    };

    if (conversationId) {
      fetchMessages();
    } else {
      setLoading(false);
    }
  }, [conversationId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Show loading
    // Clear input
    setInput("");
    setLoading(true);

    if (input.trim() === "") return;

    // Add user message to state
    const newMessages = [...messages, { text: input, sender: "user" }];

    // if we don't have a conversationId, create a new conversation
    if (!conversationId) {
      const response = await axios.post("/api/conversation", {
        text: input,
        sender: "user",
      });
      navigate(`/conversation/${response.data.id}`);
      return;
    }

    const response = await axios.put(`/api/conversation/${conversationId}`, {
      text: input,
      sender: "user",
    });
    if (response.status === 200) {
      setMessages(newMessages);
    } else {
      setMessages([...messages, { text: "Network error", sender: "bot" }]);
    }

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
      axios.put(`/api/conversation/${conversationId}`, {
        text: response.data.choices[0].message.content,
        sender: "bot",
      });
      setMessages([
        ...newMessages,
        { text: response.data.choices[0].message.content, sender: "bot" },
      ]);
    } catch (error) {
      axios.put(`/api/conversation/${conversationId}`, {
        text: "womp womp",
        sender: "bot",
      });

      setMessages([...newMessages, { text: "womp womp", sender: "bot" }]);
    } finally {
      // Hide loading
      setLoading(false);
    }
  };

  return (
    <div className={`chat-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="messages">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} />
        ))}
        {loading && <div className="loading">Loading...</div>}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey === false) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
