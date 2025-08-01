const postModel = require('../models/postModel');

exports.getAllPosts = (req, res) => {
  try {
    const posts = postModel.getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPostById = (req, res) => {
  try {
    const post = postModel.getPostById(parseInt(req.params.id));
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPost = (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = postModel.createPost(title, content);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePost = (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedPost = postModel.updatePost(
      parseInt(req.params.id),
      title,
      content
    );
    res.json(updatedPost);
  } catch (error) {
    if (error.message === 'Post not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

exports.deletePost = (req, res) => {
  try {
    const deletedPost = postModel.deletePost(parseInt(req.params.id));
    res.json({ message: 'Post deleted successfully', post: deletedPost });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
