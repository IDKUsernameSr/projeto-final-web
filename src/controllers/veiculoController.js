const VeiculoModel = require('../models/veiculoModel');

module.exports = {
  async listar(req, res) {
    const veiculos = await VeiculoModel.listarTodos(); // busca todos os veiculos
    return res.render('pages/veiculos/list', {
      title: 'Veículos',
      veiculos,
      error: null,
      success: req.query.success || null // mensagem de sucesso
    });
  },

  novoForm(req, res) {
    return res.render('pages/veiculos/new', {
      title: 'Novo veículo',
      error: null
    });
  },

  // criar veiculo
  async criar(req, res) {

    const { marca, modelo, placa, tipo, valor_diaria } = req.body; // dados do form

    try {
      await VeiculoModel.criar({ marca, modelo, placa, tipo, valor_diaria }); // cria veiculo
      return res.redirect('/veiculos?success=Veículo cadastrado com sucesso');
    } catch (err) {
      console.error(err);

      let msg = 'Erro ao cadastrar veículo.';
      if (err.code === '23505') {
        msg = 'Placa já cadastrada.'; // erro de placa duplicada
      }

      return res.render('pages/veiculos/new', {
        title: 'Novo veículo',
        error: msg // mostra erro na tela
      });
    }
  },

  // editar
  async editarForm(req, res) {
    const { id } = req.params;
    const veiculo = await VeiculoModel.buscarPorId(id); // busca veiculo pelo id

    if (!veiculo) {
      return res.redirect('/veiculos'); // se nao achar, volta pra lista
    }

    return res.render('pages/veiculos/edit', {
      title: 'Editar veículo',
      veiculo,
      error: null
    });
  },

  // atualizar
  async atualizar(req, res) {
    const { id } = req.params;
    const { marca, modelo, placa, tipo, valor_diaria } = req.body;

    try {
      await VeiculoModel.atualizar(id, { marca, modelo, placa, tipo, valor_diaria }); // atualiza veiculo
      return res.redirect('/veiculos?success=Veículo atualizado com sucesso');
    } catch (err) {
      console.error(err);

      let msg = 'Erro ao atualizar veículo.';
      if (err.code === '23505') {
        msg = 'Placa já cadastrada.'; // erro de duplicacao
      }

      const veiculo = { id, marca, modelo, placa, tipo, valor_diaria }; // mantem dados no form

      return res.render('pages/veiculos/edit', {
        title: 'Editar veículo',
        veiculo,
        error: msg
      });
    }
  },

  // deletar
  async deletar(req, res) {
    const { id } = req.params;

    try {
      await VeiculoModel.deletar(id); // exclui veiculo
      return res.redirect('/veiculos?success=Veículo excluído com sucesso');
    } catch (err) {
      console.error(err);

      let msg = 'Não é possível excluir veículo com locações associadas.';

      return res.render('pages/veiculos/list', {
        title: 'Veículos',
        veiculos: await VeiculoModel.listarTodos(), // recarrega lista
        error: msg,
        success: null
      });
    }
  }
};