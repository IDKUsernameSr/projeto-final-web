const pool = require('../config/db');

module.exports = {
  async listarTodos() {
    const result = await pool.query(
      'SELECT * FROM veiculos ORDER BY modelo ASC' // lista todos
    );
    return result.rows;
  },

  async listarDisponiveis() {
    const result = await pool.query(
      "SELECT * FROM veiculos WHERE status = 'disponível' ORDER BY modelo ASC" // somente disponiveis
    );
    return result.rows;
  },

  async buscarPorId(id) {
    const result = await pool.query(
      'SELECT * FROM veiculos WHERE id = $1',  // busca por id
      [id]
    );
    return result.rows[0];
  },

  // cria veículo
  async criar({ marca, modelo, placa, tipo, valor_diaria }) {
    const result = await pool.query(
      `INSERT INTO veiculos (marca, modelo, placa, tipo, valor_diaria)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [marca, modelo, placa, tipo, valor_diaria]
    );
    return result.rows[0];
  },

  // atualiza
  async atualizar(id, { marca, modelo, placa, tipo, valor_diaria }) {
    const result = await pool.query(
      `UPDATE veiculos
       SET marca = $1, modelo = $2, placa = $3, tipo = $4, valor_diaria = $5
       WHERE id = $6
       RETURNING *`,
      [marca, modelo, placa, tipo, valor_diaria, id]
    );
    return result.rows[0];
  },

  // atualiza status
  async atualizarStatus(id, status) {
    await pool.query(
      `UPDATE veiculos SET status = $1 WHERE id = $2`,
      [status, id]
    );
  },

  // deletar
  async deletar(id) {
    await pool.query('DELETE FROM veiculos WHERE id = $1', [id]);
  }
};