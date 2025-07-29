const express = require("express");
const router = express.Router();

let posts = [];
let currentId = 1;

const findPostById = (id) => posts.find((post) => post.id === id);
const findPostIndex = (id) => posts.findIndex((post) => post.id === id);

const validatePostData = (postData) => {
  if (
    !postData.title ||
    typeof postData.title !== "string" ||
    postData.title.trim() === ""
  ) {
    return {
      valid: false,
      error: "Title is required and must be a non-empty string",
    };
  }
  if (
    !postData.content ||
    typeof postData.content !== "string" ||
    postData.content.trim() === ""
  ) {
    return {
      valid: false,
      error: "Content is required and must be a non-empty string",
    };
  }
  return { valid: true };
};

router.get("/", (req, res) => {
  res.json(posts);
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = findPostById(id);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.json(post);
});

router.post("/", (req, res) => {
  const { title, content } = req.body;
  const validation = validatePostData({ title, content });

  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  const newPost = {
    id: currentId++,
    title: title.trim(),
    content: content.trim(),
    timestamp: new Date().toISOString(),
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  const validation = validatePostData({ title, content });

  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  const postIndex = findPostIndex(id);

  if (postIndex === -1) {
    return res.status(404).json({ error: "Post not found" });
  }

  posts[postIndex] = {
    ...posts[postIndex],
    title: title.trim(),
    content: content.trim(),
    updatedAt: new Date().toISOString(),
  };

  res.json(posts[postIndex]);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = posts.length;

  posts = posts.filter((post) => post.id !== id);

  if (posts.length === initialLength) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.status(204).end();
});

module.exports = router;
