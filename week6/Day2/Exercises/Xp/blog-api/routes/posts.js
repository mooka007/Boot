const express = require('express');
const router = express.Router();
const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/postController');

// @route   GET /api/posts
// @desc    Get all posts
// @access  Public
router.get('/', getAllPosts);

// @route   GET /api/posts/:id
// @desc    Get single post
// @access  Public
router.get('/:id', getPost);

// @route   POST /api/posts
// @desc    Create new post
// @access  Public
router.post('/', createPost);

// @route   PUT /api/posts/:id
// @desc    Update post
// @access  Public
router.put('/:id', updatePost);

// @route   DELETE /api/posts/:id
// @desc    Delete post
// @access  Public
router.delete('/:id', deletePost);

module.exports = router;
