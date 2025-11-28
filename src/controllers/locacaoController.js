const LocacaoModel = require('../models/locacaoModel');
const ClienteModel = require('../models/clienteModel');
const VeiculoModel = require('../models/veiculoModel');

module.exports = {
  async listar(req, res) {
    const locacoes = await LocacaoModel.listarTodas(); // lista todas as locacoes
    return res.render('pages/locacoes/list', {
      title: 'Locações',
      locacoes,
      error: null,
      success: req.query.success || null // mensagem de sucesso
    });
  },

  async novoForm(req, res) {
    const clientes = await ClienteModel.listarTodos(); // clientes para selecionar
    const veiculos = await VeiculoModel.listarDisponiveis(); // veiculos para selecionar

    return res.render('pages/locacoes/new', {
      title: 'Nova locação',
      clientes,
      veiculos,
      error: null
    });
  },

  // criar locacao
  async criar(req, res) {
    const { cliente_id, veiculo_id, data_inicio, data_fim } = req.body; // dados do form

    try {
      // busca o veículo para pegar o valor da diária
      const veiculo = await VeiculoModel.buscarPorId(veiculo_id);
      if (!veiculo) {
        throw new Error('Veículo não encontrado');
      }

      // converte as datas
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

      // calcula a quantidade de dias
      const diffMs = fim - inicio; // milissegundos
      let dias = diffMs / (1000 * 60 * 60 * 24);

      // arredonda pra cima garante pelo menos 1 dia
      dias = Math.max(1, Math.ceil(dias));

      // calcula o valor total
      const valorDiaria = Number(veiculo.valor_diaria);
      const valor_total = dias * valorDiaria;

      // salva no banco
      await LocacaoModel.criar({
        cliente_id,
        veiculo_id,
        data_inicio,
        data_fim,
        valor_total
      });

      await VeiculoModel.atualizarStatus(veiculo_id, 'alugado'); // marca como alugado

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

    const locacao = await LocacaoModel.buscarPorId(id); // busca locacao
    const clientes = await ClienteModel.listarTodos();
    const veiculos = await VeiculoModel.listarTodos();

    if (!locacao) {
      return res.redirect('/locacoes'); // se nao achar volta pra lista
    }

    return res.render('pages/locacoes/edit', {
      title: 'Editar locação',
      locacao,
      clientes,
      veiculos,
      error: null
    });
  },

// atualizar
async atualizar(req, res) {
  const { id } = req.params;
  const { cliente_id, veiculo_id, data_inicio, data_fim } = req.body; // dados do form

  try {
    // busca o veiculo para calcular a diaria novamente
    const veiculo = await VeiculoModel.buscarPorId(veiculo_id); // pega veiculo novo
    if (!veiculo) throw new Error('Veículo não encontrado');

    // converte e valida datas
    const inicio = new Date(data_inicio);
    const fim = new Date(data_fim);

    if (isNaN(inicio) || isNaN(fim) || fim < inicio) {
      const clientes = await ClienteModel.listarTodos();
      const veiculos = await VeiculoModel.listarTodos();

      return res.render('pages/locacoes/edit', {
        title: 'Editar locação',
        locacao: { id, cliente_id, veiculo_id, data_inicio, data_fim }, // mantem dados
        clientes,
        veiculos,
        error: 'Datas inválidas.'
      });
    }

    // calcula a quantidade de dias
    const diffMs = fim - inicio;
    let dias = diffMs / (1000 * 60 * 60 * 24);
    dias = Math.max(1, Math.ceil(dias)); // mínimo 1 dia

    // recalcula o valor total
    const valorDiaria = Number(veiculo.valor_diaria);
    const valor_total = dias * valorDiaria;

    // atualiza no banco
    await LocacaoModel.atualizar(id, {
      cliente_id,
      veiculo_id,
      data_inicio,
      data_fim,
      valor_total
    });

    // aqui você compara o veículo antigo com o novo
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
      locacao: { id, cliente_id, veiculo_id, data_inicio, data_fim }, // volta com dados preenchidos
      clientes,
      veiculos,
      error: 'Erro ao atualizar locação.'
    });
  }
},

  // deletar
  async deletar(req, res) {
  const { id } = req.params;

  try {
    const locacao = await LocacaoModel.buscarPorId(id); // busca locacao

    if (!locacao) {
      return res.redirect('/locacoes'); // se nao achar, volta
    }

    await LocacaoModel.deletar(id); // deleta locacao

    await VeiculoModel.atualizarStatus(locacao.veiculo_id, 'disponível'); // libera veiculo

    return res.redirect('/locacoes?success=Locação excluída com sucesso');
  } catch (err) {
    console.error(err);
    return res.redirect('/locacoes?error=Não foi possível excluir esta locação.');
  }
}
};