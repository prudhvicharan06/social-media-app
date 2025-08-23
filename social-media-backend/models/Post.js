import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
// This code defines a Mongoose schema for a "Post" model in a social media application.