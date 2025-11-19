const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || '',
  database: process.env.PGDATABASE || 'locadora_db',
  port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
});

module.exports = pool;