import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      alert("Please login first.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/posts",
        { content }, // Fix: send content as a string, not as an object
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );
      alert("Post created successfully!");
      navigate("/posts");
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post.");
    }
  };

  return (
    <div>
      <h2>Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="4"
          cols="50"
        />
        <br />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
