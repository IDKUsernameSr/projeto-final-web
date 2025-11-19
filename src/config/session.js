require('dotenv').config();
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const pool = require('./db');

const sessionMiddleware = session({
  store: new PgSession({
    pool,
    tableName: 'session',
    createTableIfMissing: true,
  }),
  secret: process.env.SESSION_SECRET || 'troque-este-segredo-depois',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2, // 2 horas
  },
});

module.exports = sessionMiddleware;