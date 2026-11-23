const mongoose = require('mongoose');

const EmpreendedorSchema = new mongoose.Schema(
  {
    nomeNegocio: { type: String, required: true },
    proprietario: { type: String, required: true },
    categoria: { type: String, required: true },
    telefone: { type: String, required: true },
    bairro: { type: String, required: true },
    descricao: { type: String },
    status: { type: String, default: 'Ativo' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Empreendedor', EmpreendedorSchema);