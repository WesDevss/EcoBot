import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Chip,
  LinearProgress,
  Tooltip,
  Button,
  IconButton,
  Divider,
  TextField,
  MenuItem,
  InputAdornment,
  Avatar,
  Badge,
  Fade,
  Zoom
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PendingIcon from '@mui/icons-material/Pending';
import WarningIcon from '@mui/icons-material/Warning';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';

const Suggestions = ({ mockData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  
  const suggestions = mockData?.suggestions || [
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
    },
    {
      id: 4,
      title: "Política de E-mails Sustentáveis",
      description: "Implementar diretrizes para reduzir o tamanho dos e-mails e anexos",
      impact: "Redução de 5% nas emissões de CO2",
      priority: "low",
      progress: 100,
      status: "Concluído",
      department: "Todos",
      deadline: "15/02/2024"
    },
    {
      id: 5,
      title: "Otimizar Queries de Banco de Dados",
      description: "Revisar e otimizar queries SQL que consomem muitos recursos",
      impact: "Melhoria de 20% no desempenho do banco de dados",
      priority: "medium",
      progress: 45,
      status: "Em andamento",
      department: "Desenvolvimento",
      deadline: "10/04/2024"
    }
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handlePriorityFilterChange = (event) => {
    setPriorityFilter(event.target.value);
  };

  const filteredSuggestions = suggestions.filter((suggestion) => {
    // Filtro de texto
    const matchesSearchTerm = suggestion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      suggestion.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      suggestion.department.toLowerCase().includes(searchTerm.toLowerCase());

    // Filtro de status
    const matchesStatus = statusFilter === 'all' || 
      suggestion.status.toLowerCase() === statusFilter.toLowerCase();

    // Filtro de prioridade
    const matchesPriority = priorityFilter === 'all' || 
      suggestion.priority.toLowerCase() === priorityFilter.toLowerCase();

    return matchesSearchTerm && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'concluído':
        return 'success';
      case 'em andamento':
        return 'primary';
      case 'planejado':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch(status.toLowerCase()) {
      case 'concluído':
        return <CheckCircleIcon fontSize="small" />;
      case 'em andamento':
        return <AutorenewIcon fontSize="small" />;
      case 'planejado':
        return <ScheduleIcon fontSize="small" />;
      default:
        return <PendingIcon fontSize="small" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority.toLowerCase()) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getPriorityLabel = (priority) => {
    switch(priority.toLowerCase()) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Média';
      case 'low':
        return 'Baixa';
      default:
        return priority;
    }
  };

  return (
    <Box>
      {/* Cabeçalho da página */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            sx={{ 
              bgcolor: 'primary.main', 
              width: 48, 
              height: 48, 
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center' 
            }}
          >
            <LightbulbIcon sx={{ fontSize: 32, color: '#fff' }} />
          </Avatar>
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 0.5, display: 'flex', alignItems: 'center' }}>
              Sugestões
              <Badge 
                badgeContent={filteredSuggestions.length} 
                color="primary"
                sx={{ ml: 2 }}
              />
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Recomendações de otimização para reduzir o impacto ambiental
            </Typography>
          </Box>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<LightbulbIcon />}
          sx={{ 
            fontWeight: 600,
            px: 3,
            py: 1
          }}
        >
          Nova Sugestão
        </Button>
      </Box>

      {/* Filtros e busca */}
      <Card sx={{ mb: 4, borderRadius: 2, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                placeholder="Buscar sugestões..."
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 2 }
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                select
                fullWidth
                label="Filtrar por Status"
                value={statusFilter}
                onChange={handleStatusFilterChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FilterListIcon color="action" />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 2 }
                }}
              >
                <MenuItem value="all">Todos os Status</MenuItem>
                <MenuItem value="concluído">Concluído</MenuItem>
                <MenuItem value="em andamento">Em Andamento</MenuItem>
                <MenuItem value="planejado">Planejado</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                select
                fullWidth
                label="Filtrar por Prioridade"
                value={priorityFilter}
                onChange={handlePriorityFilterChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WarningIcon color="action" />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 2 }
                }}
              >
                <MenuItem value="all">Todas as Prioridades</MenuItem>
                <MenuItem value="high">Alta</MenuItem>
                <MenuItem value="medium">Média</MenuItem>
                <MenuItem value="low">Baixa</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={1} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Tooltip title="Ordenar resultados">
                <IconButton>
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Lista de sugestões */}
      {filteredSuggestions.length === 0 ? (
        <Card sx={{ borderRadius: 2, boxShadow: '0 2px 12px rgba(0,0,0,0.05)', p: 5, textAlign: 'center' }}>
          <EmojiNatureIcon sx={{ fontSize: 64, color: 'primary.main', opacity: 0.6, mb: 2 }} />
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
            Nenhuma sugestão encontrada
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Tente ajustar seus filtros de busca ou crie uma nova sugestão
          </Typography>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {filteredSuggestions.map((suggestion, index) => (
            <Grid item xs={12} key={suggestion.id}>
              <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                <Card 
                  sx={{ 
                    borderRadius: 2, 
                    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={7}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                          <Avatar
                            sx={{
                              bgcolor: 'primary.main',
                              width: 40,
                              height: 40,
                              mr: 2,
                            }}
                          >
                            <LightbulbIcon />
                          </Avatar>
                          <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                              <Typography variant="h6" sx={{ fontWeight: 600, mr: 2 }}>
                                {suggestion.title}
                              </Typography>
                              <Chip
                                label={suggestion.department}
                                size="small"
                                variant="outlined"
                                sx={{ borderRadius: '12px' }}
                              />
                            </Box>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                              {suggestion.description}
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                              <Chip
                                icon={getStatusIcon(suggestion.status)}
                                label={suggestion.status}
                                size="small"
                                color={getStatusColor(suggestion.status)}
                                sx={{ borderRadius: '12px' }}
                              />
                              <Chip
                                icon={<WarningIcon fontSize="small" />}
                                label={getPriorityLabel(suggestion.priority)}
                                size="small"
                                color={getPriorityColor(suggestion.priority)}
                                sx={{ borderRadius: '12px' }}
                              />
                              <Chip
                                icon={<ScheduleIcon fontSize="small" />}
                                label={`Prazo: ${suggestion.deadline}`}
                                size="small"
                                variant="outlined"
                                sx={{ borderRadius: '12px' }}
                              />
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} md={5}>
                        <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2, height: '100%' }}>
                          <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                            <CheckCircleIcon fontSize="small" sx={{ mr: 1, color: 'success.main' }} />
                            Impacto Estimado
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 2, fontWeight: 500, color: 'success.main' }}>
                            {suggestion.impact}
                          </Typography>
                          
                          <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            Progresso: {suggestion.progress}%
                          </Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={suggestion.progress} 
                            color={suggestion.progress === 100 ? "success" : "primary"}
                            sx={{ 
                              height: 8, 
                              borderRadius: 4,
                              mb: 2
                            }} 
                          />
                          
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                              variant="outlined"
                              size="small"
                              endIcon={<ArrowForwardIcon />}
                              sx={{ borderRadius: '20px' }}
                            >
                              Ver Detalhes
                            </Button>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Suggestions; 