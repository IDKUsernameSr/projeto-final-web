const express = require('express');
const router = express.Router();

const VeiculoController = require('../controllers/veiculoController');
const requireAuth = require('../middlewares/auth');

router.use(requireAuth);

router.get('/', VeiculoController.listar);

router.get('/novo', VeiculoController.novoForm);
router.post('/', VeiculoController.criar);

router.get('/:id/editar', VeiculoController.editarForm);
router.post('/:id', VeiculoController.atualizar);

router.post('/:id/deletar', VeiculoController.deletar);

module.exports = router;