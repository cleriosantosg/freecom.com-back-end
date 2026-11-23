const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');
const Empreendedor = require('../models/Empreendedor');
const Categoria = require('../models/Categoria');

router.get('/', async (req, res) => {
  const { pesquisa, categoria } = req.query;
  let query = {};

  if (pesquisa) query.titulo = new RegExp(pesquisa, 'i');
  if (categoria) query.categoria = categoria;

  const produtos = await Produto.find(query).sort({ createdAt: -1 });
  const categorias = await Categoria.find({ ativa: true });

  res.render('admin/produtos/listar', { produtos, categorias, pesquisa, categoria });
});

router.get('/novo', async (req, res) => {
  const empreendedores = await Empreendedor.find({ status: 'Ativo' }).sort({ nomeNegocio: 1 });
  const categorias = await Categoria.find({ ativa: true }).sort({ nome: 1 });

  res.render('admin/produtos/cadastrar', { empreendedores, categorias });
});

router.post('/novo', async (req, res) => {
  req.body.disponivel = req.body.disponivel === 'on';
  await Produto.create(req.body);
  res.redirect('/admin/produtos');
});

router.get('/editar/:id', async (req, res) => {
  const produto = await Produto.findById(req.params.id);
  const empreendedores = await Empreendedor.find({ status: 'Ativo' }).sort({ nomeNegocio: 1 });
  const categorias = await Categoria.find({ ativa: true }).sort({ nome: 1 });

  res.render('admin/produtos/editar', { produto, empreendedores, categorias });
});

router.put('/editar/:id', async (req, res) => {
  req.body.disponivel = req.body.disponivel === 'on';
  await Produto.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/admin/produtos');
});

router.delete('/excluir/:id', async (req, res) => {
  await Produto.findByIdAndDelete(req.params.id);
  res.redirect('/admin/produtos');
});

module.exports = router;