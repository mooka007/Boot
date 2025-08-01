const pool = require('../config/database');

class Post {
  // Get all posts
  static async findAll() {
    try {
      const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
      return result.rows;
    } catch (error) {
      throw new Error(`Error fetching posts: ${error.message}`);
    }
  }

  // Get post by ID
  static async findById(id) {
    try {
      const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
      return result.rows[0] || null;
    } catch (error) {
      throw new Error(`Error fetching post: ${error.message}`);
    }
  }

  // Create new post
  static async create(title, content) {
    try {
      const result = await pool.query(
        'INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *',
        [title, content]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error creating post: ${error.message}`);
    }
  }

  // Update post
  static async update(id, title, content) {
    try {
      const result = await pool.query(
        'UPDATE posts SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
        [title, content, id]
      );
      return result.rows[0] || null;
    } catch (error) {
      throw new Error(`Error updating post: ${error.message}`);
    }
  }

  // Delete post
  static async delete(id) {
    try {
      const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
      return result.rows[0] || null;
    } catch (error) {
      throw new Error(`Error deleting post: ${error.message}`);
    }
  }
}

module.exports = Post;
