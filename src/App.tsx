import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./Pages/HomePage/HomePage";

function App() {
  return (
    <>
      {/* have routes here (login, signup, homepage */}
      <Routes>
        <Route path="/*" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
