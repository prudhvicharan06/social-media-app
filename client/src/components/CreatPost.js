import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/createPost.css';

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      alert("Please write something first!");
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/posts",
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );
      navigate("/posts");
    } catch (err) {
      alert("Failed to create post: " + (err.response?.data?.message || "Unknown error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-post-container">
      <div className="create-post-card">
        <h2>Create a New Post</h2>
        <form onSubmit={handleSubmit} className="create-post-form">
          <div className="form-group">
            <textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="6"
              maxLength="500"
              className="post-textarea"
            />
            <div className="char-counter">
              {content.length}/500 characters
            </div>
          </div>
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting || !content.trim()}
          >
            {isSubmitting ? "Posting..." : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
