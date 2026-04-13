# EcoBot

O EcoBot utiliza React no frontend, Node.js com Express no backend, MongoDB para persistência de dados e testes com Jest, garantindo uma arquitetura simples, escalável e eficiente.

## Arquitetura do Projeto

### Frontend

Responsável pela interface do usuário.

Tecnologias previstas:

- React
- Material-UI
- React Router
- Recharts
- Context API
- Local Storage

### Backend / API

Responsável pelas regras de negócio e comunicação com o banco de dados.

Tecnologias:

- Node.js
- Express
- API REST
- JWT

### Banco de Dados

Responsável pela persistência dos dados.

Tecnologia:

- MongoDB com Mongoose

### Testes

Responsável pela validação da aplicação.

Ferramentas previstas:

- Jest
- React Testing Library
- Supertest

### Comunicação

- Frontend → Backend → Banco de Dados
- API em JSON
- URL padrão local: `http://localhost:3001/api`

## Estrutura de Pastas

```text
EcoBot/
├── backend/
│   └── src/
│       ├── config/
│       │   ├── database.js
│       │   └── env.js
│       ├── controllers/
│       │   ├── chat.controller.js
│       │   ├── metrics.controller.js
│       │   └── suggestions.controller.js
│       ├── data/
│       │   ├── metrics.data.js
│       │   └── suggestions.data.js
│       ├── middlewares/
│       ├── models/
│       ├── routes/
│       │   ├── chat.routes.js
│       │   ├── index.js
│       │   ├── metrics.routes.js
│       │   └── suggestions.routes.js
│       ├── services/
│       │   └── chatbot.service.js
│       ├── utils/
│       ├── app.js
│       └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   └── charts/
│       ├── context/
│       ├── pages/
│       ├── routes/
│       └── services/
├── tests/
│   ├── backend/
│   ├── frontend/
│   ├── integration/
│   └── unit/
├── .env.example
├── .gitignore
├── package.json
├── server.js
└── vercel.json
```

## Status da Estrutura

- O backend já foi reorganizado para uma separação mais clara entre configuração, rotas, controllers e services.
- O frontend foi preparado com a estrutura de diretórios para o restante do time implementar.
- A raiz do projeto foi ajustada para facilitar deploy na Vercel com `server.js` e `vercel.json`.
- A conexão com MongoDB está preparada por ambiente através de `MONGODB_URI`.

## Endpoints Disponíveis Hoje

- `GET /api/health`
- `GET /api/metrics`
- `GET /api/suggestions`
- `POST /api/chat`

## Executando Localmente

### Requisitos

- Node.js 20 ou superior
- npm

### Instalação

```bash
npm install
```

### Variáveis de ambiente

Crie um arquivo `.env` com base em `.env.example`.

Exemplo:

```env
PORT=3001
CORS_ORIGIN=http://localhost:3000
MONGODB_URI=
```

### Rodando a API

```bash
npm run dev
```

API local:

```text
http://localhost:3001/api
```

## Deploy na Vercel

- A entrada de deploy está configurada na raiz com `server.js`.
- O arquivo `vercel.json` direciona as rotas para a API Express.
- Para usar MongoDB em produção, configure `MONGODB_URI` nas variáveis de ambiente da Vercel.

## Divisão de Responsabilidades

### Tech Lead / API

- Organizar a arquitetura do projeto
- Padronizar estrutura de pastas
- Preparar backend para deploy
- Definir base da API e integração com banco

### Time Frontend

- Implementar telas, componentes e rotas React
- Aplicar Material-UI, Recharts e Context API
- Integrar frontend com a API REST

### Time Backend

- Evoluir controllers, services, models e autenticação JWT
- Integrar MongoDB com Mongoose
- Criar validações e regras de negócio

### Time QA

- Estruturar testes unitários e de integração
- Validar fluxos principais da aplicação
- Apoiar a qualidade do deploy

## Padrão de Commits

Sugestão para manter commits limpos:

- `chore: reorganize backend structure for deployment`
- `chore: add frontend and test folder scaffolding`
- `docs: update readme with architecture and repository structure`
- `chore: add vercel and environment configuration`

## Branch de Trabalho

Branch criada para esta organização:

```text
chore/project-structure-vercel
```
