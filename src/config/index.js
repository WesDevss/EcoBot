const config = {
  // Configurações da API
  api: {
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001',
    timeout: 30000,
  },

  // Configurações de autenticação
  auth: {
    storageKey: 'ecobot_user',
    tokenKey: 'ecobot_token',
    expirationKey: 'ecobot_token_expiration',
  },

  // Configurações de tema
  theme: {
    primaryColor: '#1B3B36',
    secondaryColor: '#4CAF50',
  },

  // Configurações de integração
  integrations: {
    google: {
      clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    },
    microsoft: {
      clientId: process.env.REACT_APP_MICROSOFT_CLIENT_ID,
    },
    github: {
      clientId: process.env.REACT_APP_GITHUB_CLIENT_ID,
    },
  },

  // Configurações gerais
  app: {
    name: 'EcoBot',
    version: '1.0.0',
    description: 'Sistema de Gestão de Sustentabilidade Digital',
    company: 'EcoBot Technologies',
  },
};

export default config; 