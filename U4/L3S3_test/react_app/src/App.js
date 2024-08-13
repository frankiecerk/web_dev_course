import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import UserGallery from "./UserGallery";
import AddUser from "./AddUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserGallery />} />
        <Route path="/add" element={<AddUser />} />
      </Routes>
    </Router>
  );
}

export default App;
