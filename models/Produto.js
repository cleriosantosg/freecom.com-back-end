const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    preco: { type: Number, required: true },
    categoria: { type: String, required: true },
    empreendedorNome: { type: String, required: true },
    disponivel: { type: Boolean, default: true },
    descricao: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Produto', ProdutoSchema);