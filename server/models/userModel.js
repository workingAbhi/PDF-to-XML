// server/models/userModel.js
const { pool } = require('../config/db');
const bcrypt = require('bcrypt');

const userModel = {
  async create(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );
    return result.rows[0];
  },

  async findByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },

  async findById(id) {
    const result = await pool.query('SELECT id, name, email, created_at FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }
};

module.exports = userModel;