const bcrypt = require('bcrypt');
const UsuarioModel = require('../models/usuarioModel');

module.exports = {
  loginPage(req, res) {
    return res.render('pages/login', { title: 'Login' }); // pagina de login
  },

  registerPage(req, res) {
    return res.render('pages/register', { title: 'Registrar' }); // pagina de registrar
  },

  // login
  async login(req, res) {
    const { email, senha } = req.body; // dados do formulario

    const usuario = await UsuarioModel.buscarPorEmail(email); // busca usuario pelo email

    if (!usuario) {
      return res.render('pages/login', { title: 'Login', error: 'Usuário não encontrado' }); // erro
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash); // compara senha

    if (!senhaValida) {
      return res.render('pages/login', { title: 'Login', error: 'Senha incorreta' }); // erro
    }

    // salva usuário na sessão
    req.session.user = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      tipo: usuario.tipo
    };

    return res.redirect('/'); // redireciona
  },

  // registrar
  async register(req, res) {
    const { nome, email, senha } = req.body; // dados do formulario

    const usuarioExistente = await UsuarioModel.buscarPorEmail(email); // verifica email

    if (usuarioExistente) {
      return res.render('pages/register', { title: 'Registrar', error: 'Email já cadastrado' }); // erro
    }

    const senhaHash = await bcrypt.hash(senha, 10); // hash da senha

    await UsuarioModel.criarUsuario(nome, email, senhaHash); // cria usuario

    return res.redirect('/login'); // vai para login
  },

  logout(req, res) {
    req.session.destroy(() => {
      res.redirect('/login'); // encerra sessao
    });
  }
};