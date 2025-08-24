import React, { useEffect, useState } from "react";
import axios from "axios";
import './PostFeed.css'; // Add this import if you want to use a separate CSS file

const PostFeed = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="postfeed-container">
      <h2 className="postfeed-title">Recent Posts</h2>
      <div className="postfeed-list">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div className="post-card" key={post._id}>
              <div className="post-content">{post.content}</div>
              <div className="post-meta">
                <span className="post-author">By: {post.author?.name || 'Unknown'}</span>
                <span className="post-date">{new Date(post.createdAt).toLocaleString()}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="no-posts">No posts yet.</div>
        )}
      </div>
    </div>
  );
};

export default PostFeed;
