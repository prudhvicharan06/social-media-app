import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import PostFeed from "./components/PostFeed";
import CreatePost from "./components/CreatPost";
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<PostFeed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/posts" element={<PostFeed />} />
            <Route path="/create" element={<CreatePost />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
       
