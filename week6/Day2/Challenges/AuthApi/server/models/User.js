const { pool } = require('../config/database');
const bcrypt = require('bcrypt');

class User {
  constructor(data) {
    this.email = data.email;
    this.username = data.username;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.password = data.password;
  }

  // Register new user with transaction
  async save() {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();

      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(this.password, saltRounds);

      // Insert into users table
      const [userResult] = await connection.execute(
        'INSERT INTO users (email, username, first_name, last_name) VALUES (?, ?, ?, ?)',
        [this.email, this.username, this.first_name, this.last_name]
      );

      // Insert into hashpwd table
      await connection.execute(
        'INSERT INTO hashpwd (username, password) VALUES (?, ?)',
        [this.username, hashedPassword]
      );

      await connection.commit();
      
      return {
        id: userResult.insertId,
        email: this.email,
        username: this.username,
        first_name: this.first_name,
        last_name: this.last_name
      };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // Find user by username
  static async findByUsername(username) {
    try {
      const [rows] = await pool.execute(
        'SELECT u.*, h.password FROM users u JOIN hashpwd h ON u.username = h.username WHERE u.username = ?',
        [username]
      );
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Find user by ID
  static async findById(id) {
    try {
      const [rows] = await pool.execute(
        'SELECT id, email, username, first_name, last_name, created_at, updated_at FROM users WHERE id = ?',
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Get all users
  static async findAll() {
    try {
      const [rows] = await pool.execute(
        'SELECT id, email, username, first_name, last_name, created_at, updated_at FROM users ORDER BY created_at DESC'
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Update user by ID
  static async updateById(id, userData) {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();

      // Update users table
      const [result] = await connection.execute(
        'UPDATE users SET email = ?, first_name = ?, last_name = ? WHERE id = ?',
        [userData.email, userData.first_name, userData.last_name, id]
      );

      // If password is provided, update hashpwd table
      if (userData.password) {
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
        
        // Get username first
        const [userRows] = await connection.execute('SELECT username FROM users WHERE id = ?', [id]);
        if (userRows.length > 0) {
          await connection.execute(
            'UPDATE hashpwd SET password = ? WHERE username = ?',
            [hashedPassword, userRows[0].username]
          );
        }
      }

      await connection.commit();
      return result.affectedRows > 0;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // Verify password
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;
