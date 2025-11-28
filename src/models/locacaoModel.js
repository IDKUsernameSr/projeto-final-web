const pool = require('../config/db');

module.exports = {
  async listarTodas() {
    const result = await pool.query(`
      SELECT 
        l.id,
        l.data_inicio,
        l.data_fim,
        l.valor_total,
        
        c.id AS cliente_id,
        c.nome AS cliente_nome,
        
        v.id AS veiculo_id,
        v.marca,
        v.modelo,
        v.placa

      FROM locacoes l
      JOIN clientes c ON c.id = l.cliente_id
      JOIN veiculos v ON v.id = l.veiculo_id
      ORDER BY l.id DESC
    `); // junta cliente, veiculo e mais recente primeiro

    return result.rows;
  },

  async buscarPorId(id) {
    const result = await pool.query(`
      SELECT * FROM locacoes WHERE id = $1
    `, [id]); // busca pelo id

    return result.rows[0];
  },

  async buscarPorCliente(cliente_id) {
    const result = await pool.query(`
      SELECT 
        l.id,
        l.data_inicio,
        l.data_fim,
        l.valor_total,

        v.marca,
        v.modelo,
        v.placa

      FROM locacoes l
      JOIN veiculos v ON v.id = l.veiculo_id
      WHERE l.cliente_id = $1
      ORDER BY l.data_inicio DESC
    `, [cliente_id]); // pega info do veículo e filtra pelo cliente

    return result.rows;
  },

  async criar({ cliente_id, veiculo_id, data_inicio, data_fim, valor_total }) {
    const result = await pool.query(`
      INSERT INTO locacoes (cliente_id, veiculo_id, data_inicio, data_fim, valor_total)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [cliente_id, veiculo_id, data_inicio, data_fim, valor_total]); // retorna criada
    
    return result.rows[0];
  },

  async atualizar(id, { cliente_id, veiculo_id, data_inicio, data_fim, valor_total }) {
    const result = await pool.query(`
      UPDATE locacoes
      SET cliente_id = $1, veiculo_id = $2, data_inicio = $3, data_fim = $4, valor_total = $5
      WHERE id = $6
      RETURNING *
    `, [cliente_id, veiculo_id, data_inicio, data_fim, valor_total, id]); // retorna atualizada

    return result.rows[0];
  },

  async deletar(id) {
    await pool.query('DELETE FROM locacoes WHERE id = $1', [id]); // deleta
  }
};