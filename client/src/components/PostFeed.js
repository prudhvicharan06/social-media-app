import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/PostFeed.css';

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="postfeed-container">
      <div className="postfeed-header">
        <h2>Your Feed</h2>
        <button onClick={fetchPosts} className="refresh-btn">
          🔄
        </button>
      </div>
      
      <div className="posts-container">
        {loading ? (
          <div className="loading">Loading posts...</div>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <article className="post-card" key={post._id}>
              <header className="post-header">
                <div className="author-info">
                  <div className="author-avatar">
                    {post.author?.name?.charAt(0) || '?'}
                  </div>
                  <div className="author-details">
                    <h3>{post.author?.name || 'Unknown'}</h3>
                    <time>{new Date(post.createdAt).toLocaleDateString()}</time>
                  </div>
                </div>
              </header>
              
              <div className="post-body">
                {post.content}
              </div>

              <footer className="post-actions">
                <button className="action-btn">
                  ❤️ <span>Like</span>
                </button>
                <button className="action-btn">
                  💬 <span>Comment</span>
                </button>
              </footer>
            </article>
          ))
        ) : (
          <div className="empty-state">
            <h3>No posts yet</h3>
            <p>Start following people to see their posts here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostFeed;

