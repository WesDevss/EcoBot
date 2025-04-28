import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Metrics from './pages/Metrics';
import Suggestions from './pages/Suggestions';
import Layout from './components/Layout';
import { Box, Paper, Card, Snackbar, Alert } from '@mui/material';
import ChatBot from './components/ChatBot';
import { 
  Container, 
  Grid, 
  Typography, 
  Avatar,
  Divider,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Drawer,
  IconButton,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningIcon from '@mui/icons-material/Warning';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import SpeedIcon from '@mui/icons-material/Speed';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import AssessmentIcon from '@mui/icons-material/Assessment';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import InfoIcon from '@mui/icons-material/Info';
import TimelineIcon from '@mui/icons-material/Timeline';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ChatIcon from '@mui/icons-material/Chat';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import MetricsCard from './components/MetricsCard';
import SmartToyIcon from '@mui/icons-material/SmartToy';

// Dados mockados
const mockData = {
  metrics: {
    consumoEnergia: {
      atual: 0,
      anterior: 1800,
      reducao: 100,
      unidade: 'kWh',
      impacto: 'Redução significativa no consumo',
      icone: (<SpeedIcon />),
      cor: '#1B3B36',
      dados: [
        { nome: 'Jan', valor: 1800 },
        { nome: 'Fev', valor: 1750 },
        { nome: 'Mar', valor: 1700 },
        { nome: 'Abr', valor: 1650 },
        { nome: 'Mai', valor: 1600 },
        { nome: 'Jun', valor: 0 },
      ]
    },
    armazenamentoDigital: {
      atual: 500,
      anterior: 700,
      reducao: 28.6,
      unidade: 'GB',
      impacto: 'Otimização de armazenamento',
      icone: (<StorageIcon />),
      cor: '#4CAF50',
      dados: [
        { nome: 'Jan', valor: 700 },
        { nome: 'Fev', valor: 650 },
        { nome: 'Mar', valor: 600 },
        { nome: 'Abr', valor: 550 },
        { nome: 'Mai', valor: 520 },
        { nome: 'Jun', valor: 500 },
      ]
    },
    emissoesCarbonoFR: {
      atual: 200,
      anterior: 250,
      reducao: 20,
      unidade: 'tCO2',
      impacto: 'Redução de emissões',
      icone: (<CloudIcon />),
      cor: '#2e7d32',
      dados: [
        { nome: 'Jan', valor: 250 },
        { nome: 'Fev', valor: 240 },
        { nome: 'Mar', valor: 230 },
        { nome: 'Abr', valor: 220 },
        { nome: 'Mai', valor: 210 },
        { nome: 'Jun', valor: 200 },
      ]
    },
    eficiencia: {
      atual: 85,
      anterior: 75,
      reducao: -13.3,
      unidade: '%',
      impacto: 'Aumento na eficiência',
      icone: (<CheckCircleIcon />),
      cor: '#ed6c02',
      dados: [
        { nome: 'Jan', valor: 75 },
        { nome: 'Fev', valor: 77 },
        { nome: 'Mar', valor: 79 },
        { nome: 'Abr', valor: 81 },
        { nome: 'Mai', valor: 83 },
        { nome: 'Jun', valor: 85 },
      ]
    },
    impactoEmail: {
      atual: 0,
      anterior: 3000,
      reducao: 100,
      unidade: "e-mails",
      icone: (<EmailIcon />),
      cor: "#9c27b0",
      impacto: "125kg CO2 evitados"
    }
  },
  integrations: {
    active: [
      { name: "Slack", status: "Ativo", icon: (<ChatIcon />) },
      { name: "Microsoft Teams", status: "Ativo", icon: (<GroupsIcon />) },
      { name: "Google Workspace", status: "Ativo", icon: (<EmailIcon />) }
    ],
    available: [
      { name: "AWS", icon: (<CloudIcon />) },
      { name: "Azure", icon: (<CloudIcon />) },
      { name: "Google Cloud", icon: (<CloudIcon />) }
    ]
  },
  gamification: {
    topDepartments: [
      {
        name: "TI",
        score: 850,
        reduction: "25%",
        members: 15,
        achievements: ["Mestre da Economia", "Líder Verde"]
      },
      {
        name: "Marketing",
        score: 720,
        reduction: "20%",
        members: 8,
        achievements: ["Economista Digital"]
      },
      {
        name: "RH",
        score: 680,
        reduction: "18%",
        members: 5,
        achievements: ["Iniciante Verde"]
      }
    ],
    userAchievements: [
      {
        title: "Mestre da Economia",
        description: "Reduziu consumo em 30%",
        icon: (<EmojiEventsIcon />),
        date: "15/03/2024"
      },
      {
        title: "Líder Verde",
        description: "Liderou equipe em práticas sustentáveis",
        icon: (<CheckCircleIcon />),
        date: "10/03/2024"
      }
    ]
  },
  alerts: [
    {
      type: "warning",
      message: "E-mail com anexo grande detectado (8MB)",
      suggestion: "Compacte o arquivo ou use link de compartilhamento",
      timestamp: "há 5 minutos"
    },
    {
      type: "info",
      message: "Backup redundante identificado",
      suggestion: "Considere excluir versões antigas",
      timestamp: "há 15 minutos"
    }
  ],
  suggestions: [
    {
      id: 1,
      title: "Otimizar Armazenamento em Nuvem",
      description: "Identificamos 200GB de arquivos duplicados que podem ser removidos",
      impact: "Redução de 15% no consumo de energia",
      priority: "high",
      progress: 75,
      status: "Em andamento",
      department: "TI",
      deadline: "30/03/2024"
    },
    {
      id: 2,
      title: "Ajustar Configurações de Servidores",
      description: "Configurar hibernação automática em períodos de baixa atividade",
      impact: "Redução de 10% no consumo de energia",
      priority: "medium",
      progress: 30,
      status: "Planejado",
      department: "Infraestrutura",
      deadline: "15/04/2024"
    },
    {
      id: 3,
      title: "Implementar Virtualização",
      description: "Consolidar servidores físicos em máquinas virtuais",
      impact: "Redução de 25% no consumo de energia",
      priority: "high",
      progress: 10,
      status: "Planejado",
      department: "TI",
      deadline: "30/04/2024"
    }
  ],
  esgMetrics: {
    environmental: {
      co2Reduction: "45.2 tons",
      energySaved: "120,000 kWh",
      wastePrevented: "32.5 kg"
    },
    social: {
      employeeEngagement: "87%",
      sustainabilityTraining: "92%",
      communityImpact: "Positivo"
    },
    governance: {
      complianceRate: "100%",
      transparencyScore: "A+",
      sustainabilityReporting: "Trimestral"
    }
  }
};

// Rotas protegidas
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Tentar recuperar a preferência do usuário do localStorage
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true' || false;
  });
  
  const [showChatBot, setShowChatBot] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    type: 'info'
  });
  
  // Aplica o modo escuro e claro
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);
  
  // Função para alternar entre modo claro e escuro
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    showNotification(`Modo ${!darkMode ? 'escuro' : 'claro'} ativado`, 'success');
  };
  
  // Exibir notificações
  const showNotification = (message, type = 'info') => {
    setNotification({
      open: true,
      message,
      type
    });
  };
  
  // Fechar notificação
  const closeNotification = () => {
    setNotification({ ...notification, open: false });
  };
  
  // Toggle chatbot
  const toggleChatBot = () => {
    setShowChatBot(!showChatBot);
  };
  
  // Criar tema personalizado (claro/escuro)
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#156560',
        light: '#5cb8a7',
        dark: '#004c40',
        contrastText: '#fff',
      },
      secondary: {
        main: '#035aa6',
        light: '#4587d9',
        dark: '#003276',
        contrastText: '#fff',
      },
      success: {
        main: '#2e7d32',
        light: '#4caf50',
        dark: '#1b5e20',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 700,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: darkMode 
              ? '0 4px 20px rgba(0,0,0,0.2)' 
              : '0 2px 12px rgba(0,0,0,0.06)',
          },
        },
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Box sx={{ position: 'relative', height: '100vh' }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout toggleTheme={toggleTheme} darkMode={darkMode}>
                      <Dashboard mockData={mockData} />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/metricas"
                element={
                  <ProtectedRoute>
                    <Layout toggleTheme={toggleTheme} darkMode={darkMode}>
                      <Metrics mockData={mockData} />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sugestoes"
                element={
                  <ProtectedRoute>
                    <Layout toggleTheme={toggleTheme} darkMode={darkMode}>
                      <Suggestions />
                    </Layout>
                  </ProtectedRoute>
                }
              />
            </Routes>
            
            {/* Chatbot fixo flutuante */}
            {showChatBot && (
              <Box
                sx={{
                  position: 'fixed',
                  bottom: 80,
                  right: 20,
                  width: 320,
                  height: 450,
                  zIndex: 1300,
                }}
              >
                <Card 
                  elevation={6}
                  sx={{ 
                    height: '100%',
                    borderRadius: '16px',
                    overflow: 'hidden'
                  }}
                >
                  <ChatBot onClose={toggleChatBot} />
                </Card>
              </Box>
            )}
            
            {/* Botão de chat flutuante */}
            <Box
              sx={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                zIndex: 1200,
              }}
            >
              <Paper
                elevation={4}
                sx={{
                  borderRadius: '50%',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  width: 56,
                  height: 56,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'primary.main',
                  color: 'white',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                    transform: 'scale(1.05)'
                  }
                }}
                onClick={toggleChatBot}
              >
                <SmartToyIcon sx={{ fontSize: 28 }} />
              </Paper>
            </Box>
            
            {/* Sistema de notificações */}
            <Snackbar
              open={notification.open}
              autoHideDuration={4000}
              onClose={closeNotification}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
              <Alert 
                onClose={closeNotification} 
                severity={notification.type}
                variant="filled"
                sx={{ 
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}
              >
                {notification.message}
              </Alert>
            </Snackbar>
          </Box>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 