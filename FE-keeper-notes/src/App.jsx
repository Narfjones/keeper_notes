import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Animals from "../pages/Animals";
import Keepers from "../pages/Keepers";
import Notes from "../pages/Notes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Keepers" element={<Keepers />} />
        <Route path="/Animals" element={<Animals />} />
        <Route path="/Notes" element={<Notes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
