const bcrypt = require('bcrypt');
const UsuarioModel = require('../models/usuarioModel');

module.exports = {
  loginPage(req, res) {
    return res.render('pages/login', { title: 'Login' });
  },

  registerPage(req, res) {
    return res.render('pages/register', { title: 'Registrar' });
  },

  async login(req, res) {
    const { email, senha } = req.body;

    const usuario = await UsuarioModel.buscarPorEmail(email);

    if (!usuario) {
      return res.render('pages/login', { title: 'Login', error: 'Usuário não encontrado' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

    if (!senhaValida) {
      return res.render('pages/login', { title: 'Login', error: 'Senha incorreta' });
    }

    req.session.user = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      tipo: usuario.tipo
    };

    return res.redirect('/');
  },

  async register(req, res) {
    const { nome, email, senha } = req.body;

    const usuarioExistente = await UsuarioModel.buscarPorEmail(email);

    if (usuarioExistente) {
      return res.render('pages/register', { title: 'Registrar', error: 'Email já cadastrado' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    await UsuarioModel.criarUsuario(nome, email, senhaHash);

    return res.redirect('/login');
  },

  logout(req, res) {
    req.session.destroy(() => {
      res.redirect('/login');
    });
  }
};