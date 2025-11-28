module.exports = function requireAuth(req, res, next){
    if (!req.session.user) {
        return res.redirect('/login'); // se nao estiver logado, vai pro login
    }
    next();
};