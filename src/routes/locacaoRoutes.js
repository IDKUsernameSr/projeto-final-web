const express = require('express');
const router = express.Router();

const LocacaoController = require('../controllers/locacaoController');
const requireAuth = require('../middlewares/auth');

router.use(requireAuth);

router.get('/', LocacaoController.listar);

router.get('/novo', LocacaoController.novoForm);
router.post('/', LocacaoController.criar);

router.get('/:id/editar', LocacaoController.editarForm);
router.post('/:id', LocacaoController.atualizar);

router.post('/:id/deletar', LocacaoController.deletar);

module.exports = router;