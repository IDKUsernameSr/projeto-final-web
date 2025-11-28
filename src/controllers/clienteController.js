const ClienteModel = require('../models/clienteModel');

module.exports = {
  async listar(req, res) {
    const clientes = await ClienteModel.listarTodos(); // busca/lista todos
    return res.render('pages/clientes/list', {
      title: 'Clientes',
      clientes,
      error: null,
      success: req.query.success || null // msg de sucesso
    });
  },

  novoForm(req, res) {
    return res.render('pages/clientes/new', {
      title: 'Novo cliente',
      error: null // formulario vazio
    });
  },

  // criar/adicionar cliente
  async criar(req, res) {
    const { nome, cpf, telefone, email } = req.body; // dados do formulario

    try {
      await ClienteModel.criar({ nome, cpf, telefone, email }); // cria cliente
      return res.redirect('/clientes?success=Cliente criado com sucesso');
    } catch (err) {
      console.error(err);

      let msg = 'Erro ao criar cliente.';
      if (err.code === '23505') {
        msg = 'CPF ou e-mail já cadastrado.'; // erro de duplicacao
      }

      return res.render('pages/clientes/new', {
        title: 'Novo cliente',
        error: msg
      });
    }
  },

  // editar
  async editarForm(req, res) {
    const { id } = req.params;
    const cliente = await ClienteModel.buscarPorId(id); // busca pelo id

    if (!cliente) {
      return res.redirect('/clientes'); // se nao achar cliente
    }

    return res.render('pages/clientes/edit', {
      title: 'Editar cliente',
      cliente,
      error: null
    });
  },

  // atualizar
  async atualizar(req, res) {
    const { id } = req.params;
    const { nome, cpf, telefone, email } = req.body;

    try {
      await ClienteModel.atualizar(id, { nome, cpf, telefone, email }); // atualiza
      return res.redirect('/clientes?success=Cliente atualizado com sucesso');
    } catch (err) {
      console.error(err);

      let msg = 'Erro ao atualizar cliente.';
      if (err.code === '23505') {
        msg = 'CPF ou e-mail já cadastrado.'; // erro de duplicacao
      }

      const cliente = { id, nome, cpf, telefone, email }; // mantem dados no form

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
      await ClienteModel.deletar(id); // exclui cliente
      return res.redirect('/clientes?success=Cliente excluído com sucesso');
    } catch (err) {
      console.error(err);

      // erro se tiver locação ligada
      let msg = 'Não é possível excluir cliente com locações associadas.';

      return res.render('pages/clientes/list', {
        title: 'Clientes',
        clientes: await ClienteModel.listarTodos(), // recarrega lista
        error: msg,
        success: null
      });
    }
  }
};