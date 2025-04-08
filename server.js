const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Mock data for sustainability metrics
const mockMetrics = {
  energyConsumption: {
    current: 1500,
    previous: 1800,
    reduction: 16.7
  },
  digitalStorage: {
    current: 500,
    previous: 700,
    reduction: 28.6
  },
  carbonEmissions: {
    current: 200,
    previous: 250,
    reduction: 20
  }
};

// API endpoints
app.get('/api/metrics', (req, res) => {
  res.json(mockMetrics);
});

app.get('/api/suggestions', (req, res) => {
  const suggestions = [
    {
      id: 1,
      title: "Otimizar Armazenamento em Nuvem",
      description: "Identificamos 200GB de arquivos duplicados que podem ser removidos",
      impact: "Redução de 15% no consumo de energia",
      priority: "high"
    },
    {
      id: 2,
      title: "Ajustar Configurações de Servidores",
      description: "Configurar hibernação automática em períodos de baixa atividade",
      impact: "Redução de 10% no consumo de energia",
      priority: "medium"
    }
  ];
  res.json(suggestions);
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('chat message', (msg) => {
    // Process chatbot responses
    const response = processChatMessage(msg);
    io.emit('chat response', response);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

function processChatMessage(msg) {
  // Simple chatbot logic
  const responses = {
    "consumo": "Seu consumo atual está 16.7% menor que o período anterior.",
    "sugestões": "Aqui estão algumas sugestões para reduzir seu impacto ambiental...",
    "default": "Como posso ajudar com sua gestão sustentável hoje?"
  };

  return responses[msg.toLowerCase()] || responses.default;
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 