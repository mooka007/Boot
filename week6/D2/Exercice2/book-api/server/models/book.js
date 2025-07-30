const pool = require("../config/db");

async function createBooksTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        published_year INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Books table created or already exists");
  } catch (err) {
    console.error("Error creating books table:", err);
  }
}

async function getAllBooks() {
  const { rows } = await pool.query("SELECT * FROM books ORDER BY id");
  return rows;
}

async function getBookById(id) {
  const { rows } = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
  return rows[0];
}

async function createBook(title, author, publishedYear) {
  const { rows } = await pool.query(
    "INSERT INTO books (title, author, published_year) VALUES ($1, $2, $3) RETURNING *",
    [title, author, publishedYear]
  );
  return rows[0];
}

async function updateBook(id, title, author, publishedYear) {
  const { rows } = await pool.query(
    "UPDATE books SET title = $1, author = $2, published_year = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *",
    [title, author, publishedYear, id]
  );
  return rows[0];
}

async function deleteBook(id) {
  const { rowCount } = await pool.query("DELETE FROM books WHERE id = $1", [
    id,
  ]);
  return rowCount;
}

module.exports = {
  createBooksTable,
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
