const express = require('express');
const router = express.Router();

const ClienteController = require('../controllers/clienteController');
const requireAuth = require('../middlewares/auth');

// protecao de pag
router.use(requireAuth);

// listar todos
router.get('/', ClienteController.listar);

// form de novo cliente
router.get('/novo', ClienteController.novoForm);

// criar cliente
router.post('/', ClienteController.criar);

// form de edicao
router.get('/:id/editar', ClienteController.editarForm);

// atualizar
router.post('/:id', ClienteController.atualizar);

// deletar
router.post('/:id/deletar', ClienteController.deletar);

module.exports = router;