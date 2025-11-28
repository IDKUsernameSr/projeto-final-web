const express = require('express');
const router = express.Router();

const VeiculoController = require('../controllers/veiculoController');
const requireAuth = require('../middlewares/auth');

// protecao de pag
router.use(requireAuth);

// listar
router.get('/', VeiculoController.listar);

// form de novo veiculo
router.get('/novo', VeiculoController.novoForm);

// criar veiculo
router.post('/', VeiculoController.criar);

// form de edicao
router.get('/:id/editar', VeiculoController.editarForm);

// atualizar
router.post('/:id', VeiculoController.atualizar);

// deletar
router.post('/:id/deletar', VeiculoController.deletar);

module.exports = router;