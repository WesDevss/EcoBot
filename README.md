# EcoBot - Sistema de Gestão Sustentável

O EcoBot é uma solução inovadora para gestão sustentável e ESG, ajudando empresas a monitorar e reduzir seu impacto ambiental através de métricas em tempo real, sugestões personalizadas e um assistente virtual.

## Funcionalidades Principais

- 📊 Dashboard com métricas de sustentabilidade
- 🤖 Chatbot para sugestões e consultas
- 📈 Monitoramento de consumo energético
- 💡 Sugestões de otimização
- 📱 Interface moderna e responsiva

## Requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## Instalação

1. Clone o repositório
2. Instale as dependências do servidor:
```bash
npm install
```

3. Instale as dependências do cliente:
```bash
cd client
npm install
```

## Executando o Projeto

1. Inicie o servidor:
```bash
npm run dev
```

2. Em outro terminal, inicie o cliente:
```bash
cd client
npm start
```

3. Acesse a aplicação em `http://localhost:3000`

## Estrutura do Projeto

- `server.js` - Servidor Node.js com Express
- `client/` - Aplicação React
  - `src/components/` - Componentes React
  - `src/App.js` - Componente principal

## Tecnologias Utilizadas

- Frontend: React, Material-UI
- Backend: Node.js, Express
- Comunicação em tempo real: Socket.io
- Estilização: Emotion
- Gráficos: Recharts

## Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue para discutir mudanças ou melhorias. 