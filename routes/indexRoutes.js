const express = require('express');
const router = express.Router();
const Empreendedor = require('../models/Empreendedor');
const Produto = require('../models/Produto');
const Categoria = require('../models/Categoria');

router.get('/', async (req, res) => {
  const { busca, categoria } = req.query;
  let filtro = { status: 'Ativo' };

  if (busca) filtro.nomeNegocio = new RegExp(busca, 'i');
  if (categoria && categoria !== 'Todas') filtro.categoria = categoria;

  const empreendedores = await Empreendedor.find(filtro);
  const categorias = await Categoria.find({ ativa: true });

  res.render('public/index', { empreendedores, categorias, busca, categoria });
});

router.get('/admin', async (req, res) => {
  const totalEmpreendedores = await Empreendedor.countDocuments();
  const totalProdutos = await Produto.countDocuments();
  const totalCategorias = await Categoria.countDocuments();

  res.render('admin/dashboard', {
    totalEmpreendedores,
    totalProdutos,
    totalCategorias
  });
});

module.exports = router;