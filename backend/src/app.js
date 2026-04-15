const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { corsOrigin } = require('./config/env');

const app = express();

app.use(cors({ origin: corsOrigin }));
app.use(express.json());
app.use('/api', routes);

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  if (error?.name === 'CastError') {
    return res.status(400).json({ message: 'ID inválido' });
  }

  if (error?.name === 'ValidationError') {
    return res.status(400).json({ message: error.message });
  }

  if (error?.code === 11000) {
    return res.status(409).json({ message: 'Email já cadastrado' });
  }

  console.error('[api] Erro não tratado', error);
  return res.status(500).json({ message: 'Erro interno do servidor' });
});

module.exports = app;
