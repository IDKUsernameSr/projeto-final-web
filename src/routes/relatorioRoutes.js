const express = require('express');
const router = express.Router();

const RelatorioController = require('../controllers/relatorioController');
const requireAuth = require('../middlewares/auth');

router.use(requireAuth);

router.get('/cliente/:id', RelatorioController.locacoesPorCliente);

module.exports = router;