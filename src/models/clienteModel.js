const pool = require('../config/db');

module.exports = {
  async listarTodos() {
    const result = await pool.query(
      'SELECT * FROM clientes ORDER BY nome ASC'
    );
    return result.rows;
  },

  async buscarPorId(id) {
    const result = await pool.query(
      'SELECT * FROM clientes WHERE id = $1',
      [id]
    );
    return result.rows[0];
  },

  async criar({ nome, cpf, telefone, email }) {
    const result = await pool.query(
      `INSERT INTO clientes (nome, cpf, telefone, email)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [nome, cpf, telefone, email]
    );
    return result.rows[0];
  },

  async atualizar(id, { nome, cpf, telefone, email }) {
    const result = await pool.query(
      `UPDATE clientes
       SET nome = $1, cpf = $2, telefone = $3, email = $4
       WHERE id = $5
       RETURNING *`,
      [nome, cpf, telefone, email, id]
    );
    return result.rows[0];
  },

  async deletar(id) {
    await pool.query('DELETE FROM clientes WHERE id = $1', [id]);
  }

};