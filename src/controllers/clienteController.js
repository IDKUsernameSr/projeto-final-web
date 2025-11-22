const ClienteModel = require('../models/clienteModel');

module.exports = {
  async listar(req, res) {
    const clientes = await ClienteModel.listarTodos();
    return res.render('pages/clientes/list', {
      title: 'Clientes',
      clientes,
      error: null,
      success: req.query.success || null
    });
  },

  novoForm(req, res) {
    return res.render('pages/clientes/new', {
      title: 'Novo cliente',
      error: null
    });
  },

  async criar(req, res) {
    const { nome, cpf, telefone, email } = req.body;

    try {
      await ClienteModel.criar({ nome, cpf, telefone, email });
      return res.redirect('/clientes?success=Cliente criado com sucesso');
    } catch (err) {
      console.error(err);

      let msg = 'Erro ao criar cliente.';
      if (err.code === '23505') {
        msg = 'CPF ou e-mail já cadastrado.';
      }

      return res.render('pages/clientes/new', {
        title: 'Novo cliente',
        error: msg
      });
    }
  },

  async editarForm(req, res) {
    const { id } = req.params;
    const cliente = await ClienteModel.buscarPorId(id);

    if (!cliente) {
      return res.redirect('/clientes');
    }

    return res.render('pages/clientes/edit', {
      title: 'Editar cliente',
      cliente,
      error: null
    });
  },

  async atualizar(req, res) {
    const { id } = req.params;
    const { nome, cpf, telefone, email } = req.body;

    try {
      await ClienteModel.atualizar(id, { nome, cpf, telefone, email });
      return res.redirect('/clientes?success=Cliente atualizado com sucesso');
    } catch (err) {
      console.error(err);

      let msg = 'Erro ao atualizar cliente.';
      if (err.code === '23505') {
        msg = 'CPF ou e-mail já cadastrado.';
      }

      const cliente = { id, nome, cpf, telefone, email };

      return res.render('pages/clientes/edit', {
        title: 'Editar cliente',
        cliente,
        error: msg
      });
    }
  },

  async deletar(req, res) {
    const { id } = req.params;

    try {
      await ClienteModel.deletar(id);
      return res.redirect('/clientes?success=Cliente excluído com sucesso');
    } catch (err) {
      console.error(err);

      // se tiver locação ligada, o Postgre deve mandar erro
      let msg = 'Não é possível excluir cliente com locações associadas.';

      return res.render('pages/clientes/list', {
        title: 'Clientes',
        clientes: await ClienteModel.listarTodos(),
        error: msg,
        success: null
      });
    }
  }
};