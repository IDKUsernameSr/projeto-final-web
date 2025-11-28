const express = require('express');
const router = express.Router();

const LocacaoController = require('../controllers/locacaoController');
const requireAuth = require('../middlewares/auth');

// protecao de pag
router.use(requireAuth);

// listar
router.get('/', LocacaoController.listar);

// form de nova locacao
router.get('/novo', LocacaoController.novoForm);

// criar locacao
router.post('/', LocacaoController.criar);

// form de edicao
router.get('/:id/editar', LocacaoController.editarForm);

// atualizar
router.post('/:id', LocacaoController.atualizar);

// deletar
router.post('/:id/deletar', LocacaoController.deletar);

module.exports = router;