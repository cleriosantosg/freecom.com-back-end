const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    icone: { type: String, default: 'bi-shop' },
    descricao: { type: String },
    ativa: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Categoria', CategoriaSchema);