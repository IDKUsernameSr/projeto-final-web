const express = require("express");
const router = express.Router();

// rota home
router.get('/', (req, res) => {
  res.render('pages/home', { title: 'Home' });
});

module.exports = router;