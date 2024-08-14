import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ConversationPage from "./components/ConversationPage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="conversation/:conversationId"
            element={<ConversationPage />}
          />
          <Route path="/" element={<ConversationPage key="new" />} />
          {/* <Route
            path="/conversation/:conversationId"
            element={<Chatbot darkMode={false} />}
          />
          <Route path="/" element={<ConversationMenu darkMode={false} />} /> */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
