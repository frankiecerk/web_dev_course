import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ConversationMenu.css";

export default function ConversationMenu({ darkMode }) {
  const { conversationId: currentConversationId } = useParams();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      const response = await axios.get("/api/conversation");
      setConversations(response.data);
      setLoading(false);
    };

    fetchConversations();
  }, [setLoading, setConversations, currentConversationId]);

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

  const handleDelete = async (id) => {
    const response = await axios.delete(`/api/conversation/${id}`);
    setConversations(response.data);
    if (id === currentConversationId) {
      navigate("/");
    }
  };

  console.log("LOAFIN, loading:", loading);
  return (
    <div className={`conversation-menu ${darkMode ? "dark" : ""}`}>
      <div className="conversation-list">
        {!loading ? (
          <>
            {newConversation}
            {Object.entries(conversations).map(
              ([conversationId, conversation]) => (
                <>
                  <div key={conversationId} className="conversation">
                    <Link
                      to={`/conversation/${conversationId}`}
                      className="conversation-link"
                    >
                      {conversation[0]?.text}
                    </Link>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(conversationId)}
                    >
                      🗑️
                    </button>
                  </div>
                </>
              )
            )}
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
