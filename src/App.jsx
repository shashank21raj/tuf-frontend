import React from "react";
import "./App.css";
import FlipCard from "./components/Flipcard";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./components/Admin";
import Dashboard from "./components/Dashboard";
import axios from "axios";
axios.defaults.baseURL=process.env.REACT_APP_DB_URL;
axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'true';export default function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<FlipCard />} />
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}
