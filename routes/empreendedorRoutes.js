const express = require('express');
const router = express.Router();
const Empreendedor = require('../models/Empreendedor');

router.get('/', async (req, res) => {
  const { pesquisa, categoria } = req.query;
  let query = {};

  if (pesquisa) query.nomeNegocio = new RegExp(pesquisa, 'i');
  if (categoria) query.categoria = categoria;

  const empreendedores = await Empreendedor.find(query).sort({ createdAt: -1 });
  res.render('admin/empreendedores/listar', { empreendedores, pesquisa, categoria });
});

router.get('/novo', (req, res) => {
  res.render('admin/empreendedores/cadastrar');
});

router.post('/novo', async (req, res) => {
  await Empreendedor.create(req.body);
  res.redirect('/admin/empreendedores');
});

router.get('/editar/:id', async (req, res) => {
  const empreendedor = await Empreendedor.findById(req.params.id);
  res.render('admin/empreendedores/editar', { empreendedor });
});

router.put('/editar/:id', async (req, res) => {
  await Empreendedor.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/admin/empreendedores');
});

router.delete('/excluir/:id', async (req, res) => {
  await Empreendedor.findByIdAndDelete(req.params.id);
  res.redirect('/admin/empreendedores');
});

module.exports = router;