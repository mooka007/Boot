const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const JSON_PLACEHOLDER_URL = 'https://jsonplaceholder.typicode.com/posts';


app.get('/api/posts', async (req, res) => {
  try {
    const response = await axios.get(JSON_PLACEHOLDER_URL);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});


app.get('/api/posts/:id', async (req, res) => {
  try {
    const response = await axios.get(`${JSON_PLACEHOLDER_URL}/${req.params.id}`);
    if (response.data) {
      res.json(response.data);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      console.error('Error fetching post:', error.message);
      res.status(500).json({ error: 'Failed to fetch post' });
    }
  }
});


app.post('/api/posts', async (req, res) => {
  try {
    const { title, body, userId } = req.body;
    if (!title || !body || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const response = await axios.post(JSON_PLACEHOLDER_URL, {
      title,
      body,
      userId
    });
    res.status(201).json(response.data);
  } catch (error) {
    console.error('Error creating post:', error.message);
    res.status(500).json({ error: 'Failed to create post' });
  }
});


app.put('/api/posts/:id', async (req, res) => {
  try {
    const { title, body } = req.body;
    if (!title || !body) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const response = await axios.put(`${JSON_PLACEHOLDER_URL}/${req.params.id}`, {
      id: req.params.id,
      title,
      body,
      userId: 1 
    });
    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      console.error('Error updating post:', error.message);
      res.status(500).json({ error: 'Failed to update post' });
    }
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  try {
    await axios.delete(`${JSON_PLACEHOLDER_URL}/${req.params.id}`);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      console.error('Error deleting post:', error.message);
      res.status(500).json({ error: 'Failed to delete post' });
    }
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});