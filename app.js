require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

const indexRoutes = require('./routes/indexRoutes');
const empreendedorRoutes = require('./routes/empreendedorRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');

app.use('/', indexRoutes);
app.use('/admin/empreendedores', empreendedorRoutes);
app.use('/admin/produtos', produtoRoutes);
app.use('/admin/categorias', categoriaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});