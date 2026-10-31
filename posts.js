const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a post
router.post("/", async (req, res) => {
  try {
    const { userId, text, postImage } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newPost = new Post({
      user: userId,
      name: user.name,
      text,
      postImage
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;