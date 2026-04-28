const mongoose = require('mongoose');

let isConnecting = false;

function getMongoUri() {
  // Mantém compatibilidade com o nome antigo, mas prioriza o requisito do projeto (MONGO_URI).
  return process.env.MONGO_URI || process.env.MONGODB_URI || '';
}

function attachConnectionLogs() {
  // Evita registrar listeners duplicados em ambientes serverless/hot-reload.
  if (mongoose.connection.listenerCount('connected') > 0) return;

  mongoose.connection.on('connected', () => {
    console.log('[db] MongoDB conectado');
  });

  mongoose.connection.on('error', (error) => {
    console.error('[db] Erro na conexão com MongoDB', error);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('[db] MongoDB desconectado');
  });
}

async function connectDatabase() {
  const mongoUri = getMongoUri();

  if (!mongoUri) {
    console.warn('[db] MONGO_URI não definido - rodando sem conexão com MongoDB');
    return null;
  }

  attachConnectionLogs();

  // 1 = connected, 2 = connecting
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (mongoose.connection.readyState === 2 || isConnecting) return mongoose.connection;

  isConnecting = true;
  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10_000,
      socketTimeoutMS: 45_000
    });

    return mongoose.connection;
  } catch (error) {
    console.error('[db] Falha ao conectar no MongoDB', error);
    throw error;
  } finally {
    isConnecting = false;
  }
}

module.exports = {
  connectDatabase
};

