const pool = require('../config/db');

module.exports = {
  async criarUsuario(nome, email, senhaHash, tipo = 'funcionario') {
    const query = `
      INSERT INTO usuarios (nome, email, senha_hash, tipo)
      VALUES ($1, $2, $3, $4)
      RETURNING id, nome, email, tipo;
    `;
    const values = [nome, email, senhaHash, tipo]; // retorna dados do usuário

    const result = await pool.query(query, values); // cria usuário
    return result.rows[0];
  },

  async buscarPorEmail(email) {
    const result = await pool.query(
      `SELECT * FROM usuarios WHERE email = $1`, // busca pelo email
      [email]
    );
    return result.rows[0];
  }
};