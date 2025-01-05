import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Drivers from "./Drivers";
import DriverDetails from "../src/components/DriverDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Drivers />} />
        <Route path="/driver/:id" element={<DriverDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
