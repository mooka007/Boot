const Post = require("../Models/post");

async function getAllPosts(req, res) {
  try {
    const posts = await Post.getAllPosts();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getPostById(req, res) {
  const { id } = req.params;
  try {
    const post = await Post.getPostById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createPost(req, res) {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }
  try {
    const newPost = await Post.createPost(title, content);
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updatePost(req, res) {
  const { id } = req.params;
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }
  try {
    const updatedPost = await Post.updatePost(id, title, content);
    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(updatedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deletePost(req, res) {
  const { id } = req.params;
  try {
    const rowCount = await Post.deletePost(id);
    if (rowCount === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
