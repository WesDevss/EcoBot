function errorHandler(err, req, res, next) {
  console.error(err?.stack || err);

  // Erro comum do Mongoose ao receber ObjectId com formato inválido
  if (err?.name === 'CastError' && err?.kind === 'ObjectId') {
    return res.status(400).json({ message: 'ID inválido' });
  }

  const statusCode = Number(err?.statusCode) || 500;
  const message = err?.message || 'Erro interno do servidor';

  return res.status(statusCode).json({ message });
}

module.exports = errorHandler;

