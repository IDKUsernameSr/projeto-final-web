const VeiculoModel = require('../models/veiculoModel');

module.exports = {
  async listar(req, res) {
    const veiculos = await VeiculoModel.listarTodos();
    return res.render('pages/veiculos/list', {
      title: 'Veículos',
      veiculos,
      error: null,
      success: req.query.success || null
    });
  },

  novoForm(req, res) {
    return res.render('pages/veiculos/new', {
      title: 'Novo veículo',
      error: null
    });
  },

  async criar(req, res) {
    // ❌ tiramos o status daqui
    const { marca, modelo, placa, tipo, valor_diaria } = req.body;

    try {
      // ❌ não passamos mais status
      await VeiculoModel.criar({ marca, modelo, placa, tipo, valor_diaria });
      return res.redirect('/veiculos?success=Veículo cadastrado com sucesso');
    } catch (err) {
      console.error(err);

      let msg = 'Erro ao cadastrar veículo.';
      if (err.code === '23505') {
        msg = 'Placa já cadastrada.';
      }

      return res.render('pages/veiculos/new', {
        title: 'Novo veículo',
        error: msg
      });
    }
  },

  async editarForm(req, res) {
    const { id } = req.params;
    const veiculo = await VeiculoModel.buscarPorId(id);

    if (!veiculo) {
      return res.redirect('/veiculos');
    }

    return res.render('pages/veiculos/edit', {
      title: 'Editar veículo',
      veiculo,
      error: null
    });
  },

  async atualizar(req, res) {
    const { id } = req.params;
    const { marca, modelo, placa, tipo, valor_diaria } = req.body;

    try {
      await VeiculoModel.atualizar(id, { marca, modelo, placa, tipo, valor_diaria });
      return res.redirect('/veiculos?success=Veículo atualizado com sucesso');
    } catch (err) {
      console.error(err);

      let msg = 'Erro ao atualizar veículo.';
      if (err.code === '23505') {
        msg = 'Placa já cadastrada.';
      }

      const veiculo = { id, marca, modelo, placa, tipo, valor_diaria };

      return res.render('pages/veiculos/edit', {
        title: 'Editar veículo',
        veiculo,
        error: msg
      });
    }
  },

  async deletar(req, res) {
    const { id } = req.params;

    try {
      await VeiculoModel.deletar(id);
      return res.redirect('/veiculos?success=Veículo excluído com sucesso');
    } catch (err) {
      console.error(err);

      let msg = 'Não é possível excluir veículo com locações associadas.';

      return res.render('pages/veiculos/list', {
        title: 'Veículos',
        veiculos: await VeiculoModel.listarTodos(),
        error: msg,
        success: null
      });
    }
  }
};