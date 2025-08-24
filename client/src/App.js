import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import PostFeed from "./components/PostFeed";
import CreatePost from "./components/CreatPost";
import './App.css';

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px" }}>
        <Link to="/register">Reg</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/posts">View Posts</Link> |{" "}
        <Link to="/create">Create Post</Link>
      </nav>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<PostFeed />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </Router>
  );
}

export default App;
