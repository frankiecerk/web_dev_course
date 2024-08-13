import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import UserGallery from "./UserGallery";
import AddUser from "./AddUser";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<UserGallery />} />
        <Route path="/add" element={<AddUser />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
