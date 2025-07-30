const pool = require("../config/db");

async function createPostsTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Posts table created or already exists");
  } catch (err) {
    console.error("Error creating posts table:", err);
  }
}

async function getAllPosts() {
  const { rows } = await pool.query("SELECT * FROM posts ORDER BY id");
  return rows;
}

async function getPostById(id) {
  const { rows } = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
  return rows[0];
}

async function createPost(title, content) {
  const { rows } = await pool.query(
    "INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *",
    [title, content]
  );
  return rows[0];
}

async function updatePost(id, title, content) {
  const { rows } = await pool.query(
    "UPDATE posts SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *",
    [title, content, id]
  );
  return rows[0];
}

async function deletePost(id) {
  const { rowCount } = await pool.query("DELETE FROM posts WHERE id = $1", [
    id,
  ]);
  return rowCount;
}

module.exports = {
  createPostsTable,
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
