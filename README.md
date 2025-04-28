# EcoBot - Sistema de Gestão de Sustentabilidade Digital

## Descrição
O EcoBot é uma plataforma inovadora para gestão de sustentabilidade digital, focada em otimizar recursos tecnológicos e reduzir o impacto ambiental das operações digitais.

## Configuração do Ambiente

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm (versão 6 ou superior)

### Instalação
1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/ecobot.git
cd ecobot/client
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
REACT_APP_API_URL=http://localhost:3001
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
REACT_APP_MICROSOFT_CLIENT_ID=your-microsoft-client-id
REACT_APP_GITHUB_CLIENT_ID=your-github-client-id
```

### Executando o Projeto
```bash
npm start
```

O projeto estará disponível em `http://localhost:3000`

## Funcionalidades Principais

- Dashboard com métricas de sustentabilidade
- Análise detalhada de consumo de recursos
- Sugestões de otimização
- Relatórios ESG
- Chat com assistente virtual
- Integrações com sistemas externos

## Estrutura do Projeto

```
src/
  ├── components/     # Componentes reutilizáveis
  ├── contexts/      # Contextos React (Auth, Theme, etc)
  ├── pages/         # Páginas da aplicação
  ├── config/        # Configurações do projeto
  ├── routes/        # Configuração de rotas
  ├── services/      # Serviços e integrações
  └── utils/         # Funções utilitárias
```

## Tecnologias Utilizadas

- React
- Material-UI
- React Router
- Recharts
- Context API
- Local Storage

## Contribuindo

1. Fork o projeto
2. Crie sua branch de feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE.md para detalhes. 