// server/models/conversionModel.js
const { pool } = require('../config/db');

const conversionModel = {
  async create(userId, originalFilename, pdfFilePath, xmlFilePath, pdfSize, xmlSize, status) {
    const result = await pool.query(
      'INSERT INTO conversions (user_id, original_filename, pdf_file_path, xml_file_path, pdf_size, xml_size, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [userId, originalFilename, pdfFilePath, xmlFilePath, pdfSize, xmlSize, status]
    );
    return result.rows[0];
  },

  async findByUserId(userId) {
    const result = await pool.query(
      'SELECT * FROM conversions WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return result.rows;
  },

  async findById(id, userId) {
    const result = await pool.query(
      'SELECT * FROM conversions WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    return result.rows[0];
  }
};

module.exports = conversionModel;