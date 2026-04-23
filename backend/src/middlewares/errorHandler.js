function errorHandler(err, req, res, next) {
  console.error(err?.stack || err);

  const statusCode = Number(err?.statusCode) || 500;
  const message = err?.message || 'Erro interno do servidor';

  return res.status(statusCode).json({ message });
}

module.exports = errorHandler;

