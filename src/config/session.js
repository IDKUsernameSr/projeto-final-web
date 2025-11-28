require('dotenv').config();
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const pool = require('./db');

const sessionMiddleware = session({
  store: new PgSession({
    pool, // conexao com o banco
    tableName: 'session', // tabela das sessoes
    createTableIfMissing: true, // cria a tabela se nao existir
  }),
  secret: process.env.SESSION_SECRET || 'def456', // chave da sessao
  resave: false, // nao resalvar
  saveUninitialized: false, // nao salvar sessão vazia
  cookie: {
    maxAge: 1000 * 60 * 60 * 2, // 2 horas
  },
});

module.exports = sessionMiddleware; // exporta sessao