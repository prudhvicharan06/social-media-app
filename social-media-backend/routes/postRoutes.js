import express from "express";
const router = express.Router();
import Post from "../models/Post.js";
import authMiddleware from "../middleware/auth.js";

// Create a post
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newPost = new Post({
      content: req.body.content,
      author: req.user.userId,
      // Q: what is req.user.userId?
      // Ans: req.user.userId is the userId that we are getting from the token in the authmiddleware (be careful with the name of the key in the token ensure it is same as the one in the jwt.sign method)
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
//authmiddleware is used to protect the route

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
