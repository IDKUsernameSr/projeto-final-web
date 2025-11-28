require('dotenv').config(); // carregar variaveis de ambiente
const express = require('express');
const path = require('path');

const sessionMiddleware = require('./src/config/session');
const dateHelper = require('./src/helpers/date');
const homeRoutes = require('./src/routes/homeRoutes');
const authRoutes = require('./src/routes/authRoutes');
const clienteRoutes = require('./src/routes/clienteRoutes');
const veiculoRoutes = require('./src/routes/veiculoRoutes');
const locacaoRoutes = require('./src/routes/locacaoRoutes');
const relatorioRoutes = require('./src/routes/relatorioRoutes');

const app = express();

// ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// sessao
app.use(sessionMiddleware);

// usuario logado
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// formatar data
app.locals.formatDate = dateHelper.formatDate;

// rotas
app.use('/', homeRoutes);
app.use('/', authRoutes);
app.use('/clientes', clienteRoutes);
app.use('/veiculos', veiculoRoutes);
app.use('/locacoes', locacaoRoutes);
app.use('/relatorios', relatorioRoutes);

// porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});