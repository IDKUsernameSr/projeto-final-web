const LocacaoModel = require('../models/locacaoModel');
const ClienteModel = require('../models/clienteModel');
const VeiculoModel = require('../models/veiculoModel');

module.exports = {
  async listar(req, res) {
    const locacoes = await LocacaoModel.listarTodas();
    return res.render('pages/locacoes/list', {
      title: 'Locações',
      locacoes,
      error: null,
      success: req.query.success || null
    });
  },

  async novoForm(req, res) {
    const clientes = await ClienteModel.listarTodos();
    const veiculos = await VeiculoModel.listarDisponiveis();

    return res.render('pages/locacoes/new', {
      title: 'Nova locação',
      clientes,
      veiculos,
      error: null
    });
  },

  async criar(req, res) {
    const { cliente_id, veiculo_id, data_inicio, data_fim } = req.body;

    try {
      // 1) Busca o veículo para pegar o valor_da_diaria
      const veiculo = await VeiculoModel.buscarPorId(veiculo_id);
      if (!veiculo) {
        throw new Error('Veículo não encontrado');
      }

      // 2) Converte as datas
      const inicio = new Date(data_inicio);
      const fim = new Date(data_fim);

      if (isNaN(inicio) || isNaN(fim) || fim < inicio) {
        const clientes = await ClienteModel.listarTodos();
        const veiculos = await VeiculoModel.listarTodos();

        return res.render('pages/locacoes/new', {
          title: 'Nova locação',
          clientes,
          veiculos,
          error: 'Datas inválidas.'
        });
      }

      // 3) Calcula a quantidade de dias
      const diffMs = fim - inicio; // milissegundos
      let dias = diffMs / (1000 * 60 * 60 * 24);

      // arredonda pra cima, garante pelo menos 1 dia
      dias = Math.max(1, Math.ceil(dias));

      // 4) Calcula o valor total
      const valorDiaria = Number(veiculo.valor_diaria);
      const valor_total = dias * valorDiaria;

      // 5) Salva no banco
      await LocacaoModel.criar({
        cliente_id,
        veiculo_id,
        data_inicio,
        data_fim,
        valor_total
      });

      await VeiculoModel.atualizarStatus(veiculo_id, 'alugado');

      return res.redirect('/locacoes?success=Locação registrada com sucesso');
    } catch (err) {
      console.error(err);

      const clientes = await ClienteModel.listarTodos();
      const veiculos = await VeiculoModel.listarTodos();

      return res.render('pages/locacoes/new', {
        title: 'Nova locação',
        clientes,
        veiculos,
        error: 'Erro ao registrar locação.'
      });
    }
  },

  async editarForm(req, res) {
    const { id } = req.params;

    const locacao = await LocacaoModel.buscarPorId(id);
    const clientes = await ClienteModel.listarTodos();
    const veiculos = await VeiculoModel.listarTodos();

    if (!locacao) {
      return res.redirect('/locacoes');
    }

    return res.render('pages/locacoes/edit', {
      title: 'Editar locação',
      locacao,
      clientes,
      veiculos,
      error: null
    });
  },

async atualizar(req, res) {
  const { id } = req.params;
  const { cliente_id, veiculo_id, data_inicio, data_fim } = req.body;

  try {
    // 1) Busca o veículo para calcular a diária novamente
    const veiculo = await VeiculoModel.buscarPorId(veiculo_id);
    if (!veiculo) throw new Error('Veículo não encontrado');

    // 2) Converte e valida datas
    const inicio = new Date(data_inicio);
    const fim = new Date(data_fim);

    if (isNaN(inicio) || isNaN(fim) || fim < inicio) {
      const clientes = await ClienteModel.listarTodos();
      const veiculos = await VeiculoModel.listarTodos();

      return res.render('pages/locacoes/edit', {
        title: 'Editar locação',
        locacao: { id, cliente_id, veiculo_id, data_inicio, data_fim },
        clientes,
        veiculos,
        error: 'Datas inválidas.'
      });
    }

    // 3) Calcula a quantidade de dias
    const diffMs = fim - inicio;
    let dias = diffMs / (1000 * 60 * 60 * 24);
    dias = Math.max(1, Math.ceil(dias)); // mínimo 1 dia

    // 4) Recalcula o valor total
    const valorDiaria = Number(veiculo.valor_diaria);
    const valor_total = dias * valorDiaria;

    // 5) Atualiza no banco
    await LocacaoModel.atualizar(id, {
      cliente_id,
      veiculo_id,
      data_inicio,
      data_fim,
      valor_total
    });

    if (locacaoAntiga.veiculo_id !== Number(veiculo_id)) {
      await VeiculoModel.atualizarStatus(locacaoAntiga.veiculo_id, 'disponível');
      await VeiculoModel.atualizarStatus(veiculo_id, 'alugado');
    }

    return res.redirect('/locacoes?success=Locação atualizada com sucesso');

  } catch (err) {
    console.error(err);

    const clientes = await ClienteModel.listarTodos();
    const veiculos = await VeiculoModel.listarTodos();

    return res.render('pages/locacoes/edit', {
      title: 'Editar locação',
      locacao: { id, cliente_id, veiculo_id, data_inicio, data_fim },
      clientes,
      veiculos,
      error: 'Erro ao atualizar locação.'
    });
  }
},

  async deletar(req, res) {
  const { id } = req.params;

  try {
    const locacao = await LocacaoModel.buscarPorId(id);

    if (!locacao) {
      return res.redirect('/locacoes');
    }

    await LocacaoModel.deletar(id);

    await VeiculoModel.atualizarStatus(locacao.veiculo_id, 'disponível');

    return res.redirect('/locacoes?success=Locação excluída com sucesso');
  } catch (err) {
    console.error(err);
    return res.redirect('/locacoes?error=Não foi possível excluir esta locação.');
  }
}
};