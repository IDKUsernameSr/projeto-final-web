const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.PGHOST || 'localhost', // host do banco de dados
  user: process.env.PGUSER || 'postgres', // usuario banco de dados
  password: process.env.PGPASSWORD || '', // senha
  database: process.env.PGDATABASE || 'locadora_db', // nome do banco de dados
  port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432, // porta
});

module.exports = pool;