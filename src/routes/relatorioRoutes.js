const express = require('express');
const router = express.Router();

const RelatorioController = require('../controllers/relatorioController');
const requireAuth = require('../middlewares/auth');

// protecao de pag
router.use(requireAuth);

// acao relatorio
router.get('/cliente/:id', RelatorioController.locacoesPorCliente);

module.exports = router;