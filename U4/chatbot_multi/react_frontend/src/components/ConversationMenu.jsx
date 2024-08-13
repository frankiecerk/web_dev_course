import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ConversationMenu.css";

export default function ConversationMenu({ darkMode }) {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      const response = await axios.get("/api/conversation");
      setConversations(response.data);
      setLoading(false);
    };

    fetchConversations();
  }, [setLoading, setConversations]);

  const navigate = useNavigate();

  const handleNewConversation = async () => {
    // window.location.href = "/";
    navigate("/");
  };

  const newConversation = (
    <button role="link" onClick={handleNewConversation}>
      New Conversation
    </button>
  );

  console.log("LOAFIN, loading:", loading);
  return (
    <div className={`conversation-menu ${darkMode ? "dark" : ""}`}>
      <div className="conversation-list">
        {!loading ? (
          <>
            {newConversation}
            {Object.values(conversations).map((conversation) => (
              <div key={conversation.id} className="conversation">
                <Link
                  to={`/conversation/${conversation.id}`}
                  className="conversation-link"
                >
                  {conversation.messages[0]?.text}
                </Link>
              </div>
            ))}
          </>
        ) : (
          <>
            {newConversation}
            <div className="conversation-loading"> Loading...</div>
          </>
        )}
      </div>
    </div>
  );
}
