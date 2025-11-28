const ClienteModel = require('../models/clienteModel');
const LocacaoModel = require('../models/locacaoModel');

module.exports = {
  async locacoesPorCliente(req, res) {
    const { id } = req.params;

    // busca o cliente
    const cliente = await ClienteModel.buscarPorId(id);
    if (!cliente) {
      return res.redirect('/clientes?error=Cliente não encontrado');
    }

    // busca locacoes do cliente
    const locacoes = await LocacaoModel.buscarPorCliente(id);

    return res.render('pages/relatorios/cliente', {
      title: `Locações de ${cliente.nome}`,
      cliente,
      locacoes
    });
  }
};