const express = require('express');
const router = express.Router();

const ClienteController = require('../controllers/clienteController');
const requireAuth = require('../middlewares/auth');

router.use(requireAuth);

// Listar todos
router.get('/', ClienteController.listar);

// Form de novo cliente
router.get('/novo', ClienteController.novoForm);

// Criar cliente
router.post('/', ClienteController.criar);

// Form de edição
router.get('/:id/editar', ClienteController.editarForm);

// Atualizar cliente
router.post('/:id', ClienteController.atualizar);

// Excluir cliente
router.post('/:id/deletar', ClienteController.deletar);

module.exports = router;