import React, { useEffect, useState } from "react";
import Login from "./components/login/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./components/admin/admin.jsx";
import Instructor from "./components/instructor/Instructor";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/instructor" element={<Instructor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;