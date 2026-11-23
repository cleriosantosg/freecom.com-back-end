const express = require('express');
const router = express.Router();
const Categoria = require('../models/Categoria');

router.get('/', async (req, res) => {
  const { pesquisa } = req.query;
  let query = {};

  if (pesquisa) query.nome = new RegExp(pesquisa, 'i');

  const categorias = await Categoria.find(query).sort({ nome: 1 });
  res.render('admin/categorias/listar', { categorias, pesquisa });
});

router.get('/novo', (req, res) => {
  res.render('admin/categorias/cadastrar');
});

router.post('/novo', async (req, res) => {
  req.body.ativa = req.body.ativa === 'on';
  await Categoria.create(req.body);
  res.redirect('/admin/categorias');
});

router.get('/editar/:id', async (req, res) => {
  const categoria = await Categoria.findById(req.params.id);
  res.render('admin/categorias/editar', { categoria });
});

router.put('/editar/:id', async (req, res) => {
  req.body.ativa = req.body.ativa === 'on';
  await Categoria.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/admin/categorias');
});

router.delete('/excluir/:id', async (req, res) => {
  await Categoria.findByIdAndDelete(req.params.id);
  res.redirect('/admin/categorias');
});

module.exports = router;