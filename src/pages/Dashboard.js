import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Button,
  Divider,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  CardHeader,
  Badge,
  Zoom,
  Fade
} from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RefreshIcon from '@mui/icons-material/Refresh';
import TuneIcon from '@mui/icons-material/Tune';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import MetricsCard from '../components/MetricsCard';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  LabelList
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = ({ mockData }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshing, setRefreshing] = useState(false);

  // Dados para o gráfico de barras
  const barChartData = [
    { name: 'Jan', consumo: 1800, meta: 1600 },
    { name: 'Fev', consumo: 1750, meta: 1600 },
    { name: 'Mar', consumo: 1700, meta: 1600 },
    { name: 'Abr', consumo: 1650, meta: 1600 },
    { name: 'Mai', consumo: 1600, meta: 1600 },
    { name: 'Jun', consumo: 1500, meta: 1600 },
  ];

  // Dados para o gráfico de linha
  const lineChartData = [
    { name: 'Jan', emissões: 250, meta: 230 },
    { name: 'Fev', emissões: 240, meta: 230 },
    { name: 'Mar', emissões: 230, meta: 230 },
    { name: 'Abr', emissões: 220, meta: 230 },
    { name: 'Mai', emissões: 210, meta: 230 },
    { name: 'Jun', emissões: 200, meta: 230 },
  ];
  
  // Dados para o gráfico de pizza
  const pieChartData = [
    { name: 'Servidores', value: 45 },
    { name: 'Email', value: 25 },
    { name: 'Armazenamento', value: 20 },
    { name: 'Outros', value: 10 },
  ];
  
  const handleRefresh = () => {
    setRefreshing(true);
    // Simulação de atualização dos dados
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  return (
    <Box>
      {/* Cabeçalho do Dashboard */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
            Dashboard de Sustentabilidade
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Monitoramento em tempo real do impacto ambiental digital
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Atualizar dados">
            <IconButton 
              onClick={handleRefresh} 
              color="primary"
              disabled={refreshing}
            >
              <RefreshIcon sx={refreshing ? { animation: 'spin 1s linear infinite' } : {}} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Configurações">
            <IconButton color="primary">
              <TuneIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Métricas Principais com animação de entrada */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {Object.entries(mockData.metrics).map(([key, value], index) => (
          <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }} key={key}>
            <Grid item xs={12} sm={6} md={3}>
              <MetricsCard
                title={key}
                value={value.atual || value.current}
                unit={value.unidade || value.unit}
                reduction={value.reducao || value.reduction}
                previous={value.anterior || value.previous}
                impact={value.impacto || value.impact}
                icone={value.icone || value.icon}
                cor={value.cor || value.color}
                data={value.dados || value.data}
              />
            </Grid>
          </Zoom>
        ))}
      </Grid>

      {/* Gráficos e Alertas */}
      <Grid container spacing={3}>
        {/* Gráfico de Barras - Consumo de Energia */}
        <Grid item xs={12} lg={8}>
          <Fade in={true} timeout={800}>
            <Card sx={{ height: '100%', borderRadius: 2, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TimelineIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6">Consumo de Energia vs. Meta</Typography>
                  </Box>
                }
                action={
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Ver detalhes">
                      <IconButton size="small">
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <IconButton size="small">
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>
                }
              />
              <CardContent sx={{ pt: 0 }}>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={barChartData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: '#666' }}
                        axisLine={{ stroke: '#e0e0e0' }}
                        tickLine={false}
                      />
                      <YAxis 
                        tick={{ fill: '#666' }}
                        axisLine={{ stroke: '#e0e0e0' }}
                        tickLine={false}
                      />
                      <RechartsTooltip 
                        cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                        contentStyle={{ 
                          background: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Legend wrapperStyle={{ paddingTop: 10 }} />
                      <Bar 
                        dataKey="consumo" 
                        name="Consumo (kWh)" 
                        fill="#1B3B36" 
                        radius={[4, 4, 0, 0]}
                        barSize={30}
                        animationDuration={1500}
                      />
                      <Bar 
                        dataKey="meta" 
                        name="Meta (kWh)" 
                        fill="#4CAF50" 
                        radius={[4, 4, 0, 0]}
                        barSize={30}
                        animationDuration={1500}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Fade>
        </Grid>

        {/* Alertas */}
        <Grid item xs={12} lg={4}>
          <Fade in={true} timeout={1000}>
            <Card sx={{ height: '100%', borderRadius: 2, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Badge badgeContent={mockData.alerts.length} color="error" sx={{ mr: 1 }}>
                      <NotificationsActiveIcon color="action" />
                    </Badge>
                    <Typography variant="h6">Alertas Recentes</Typography>
                  </Box>
                }
                action={
                  <Button size="small" endIcon={<ArrowForwardIcon />} sx={{ fontWeight: 500 }}>
                    Ver todos
                  </Button>
                }
              />
              <CardContent sx={{ pt: 0, pb: 0 }}>
                <List>
                  {mockData.alerts.map((alert, index) => (
                    <Zoom in={true} key={index} style={{ transitionDelay: `${index * 200}ms` }}>
                      <ListItem 
                        sx={{ 
                          bgcolor: alert.type === 'warning' ? 'warning.light' : 'info.light',
                          mb: 2,
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: alert.type === 'warning' ? 'warning.main' : 'info.main',
                          borderLeftWidth: '4px'
                        }}
                      >
                        <ListItemIcon>
                          {alert.type === 'warning' ? 
                            <WarningIcon color="warning" /> : 
                            <InfoIcon color="info" />
                          }
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle2" fontWeight={600}>
                              {alert.message}
                            </Typography>
                          }
                          secondary={
                            <>
                              <Typography variant="body2" sx={{ mt: 0.5 }}>
                                {alert.suggestion}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                                {alert.timestamp}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                    </Zoom>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Fade>
        </Grid>

        {/* Gráfico de Linha - Emissões de CO2 */}
        <Grid item xs={12} md={6} lg={8}>
          <Fade in={true} timeout={1200}>
            <Card sx={{ borderRadius: 2, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TimelineIcon sx={{ mr: 1, color: '#2e7d32' }} />
                    <Typography variant="h6">Emissões de CO2 ao Longo do Tempo</Typography>
                  </Box>
                }
                action={
                  <IconButton size="small">
                    <MoreVertIcon />
                  </IconButton>
                }
              />
              <CardContent sx={{ pt: 0 }}>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={lineChartData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: '#666' }}
                        axisLine={{ stroke: '#e0e0e0' }}
                        tickLine={false}
                      />
                      <YAxis 
                        tick={{ fill: '#666' }}
                        axisLine={{ stroke: '#e0e0e0' }}
                        tickLine={false}
                      />
                      <RechartsTooltip 
                        contentStyle={{ 
                          background: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Legend wrapperStyle={{ paddingTop: 10 }} />
                      <Line 
                        type="monotone" 
                        dataKey="emissões" 
                        name="Emissões (tCO2)" 
                        stroke="#2e7d32" 
                        strokeWidth={3}
                        dot={{ r: 6, strokeWidth: 2, stroke: "#2e7d32", fill: "white" }}
                        activeDot={{ r: 8, strokeWidth: 2 }} 
                        animationDuration={2000}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="meta" 
                        name="Meta (tCO2)" 
                        stroke="#ed6c02" 
                        strokeDasharray="5 5" 
                        strokeWidth={2}
                        dot={{ r: 4, fill: "#ed6c02" }}
                        animationDuration={2000}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Fade>
        </Grid>

        {/* Novo gráfico de pizza - Distribuição de consumo */}
        <Grid item xs={12} md={6} lg={4}>
          <Fade in={true} timeout={1400}>
            <Card sx={{ borderRadius: 2, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TimelineIcon sx={{ mr: 1, color: COLORS[0] }} />
                    <Typography variant="h6">Distribuição de Consumo</Typography>
                  </Box>
                }
                action={
                  <IconButton size="small">
                    <MoreVertIcon />
                  </IconButton>
                }
              />
              <CardContent sx={{ pt: 0 }}>
                <Box sx={{ height: 300, display: 'flex', flexDirection: 'column' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        innerRadius={40}
                        paddingAngle={2}
                        dataKey="value"
                        animationDuration={1500}
                        animationBegin={300}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        labelStyle={{ fill: '#333', fontSize: 12, fontWeight: 500 }}
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip
                        formatter={(value) => [`${value}%`, 'Consumo']}
                        contentStyle={{ 
                          background: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Fade>
        </Grid>

        {/* Departamentos e Conquistas */}
        <Grid item xs={12} md={6} lg={4}>
          <Fade in={true} timeout={1600}>
            <Card sx={{ height: '100%', borderRadius: 2, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <GroupsIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6">Departamentos em Destaque</Typography>
                  </Box>
                }
                action={
                  <Button size="small" endIcon={<ArrowForwardIcon />} sx={{ fontWeight: 500 }}>
                    Ver ranking
                  </Button>
                }
              />
              <CardContent sx={{ pt: 0 }}>
                <List>
                  {mockData.gamification.topDepartments.map((dept, index) => (
                    <Zoom in={true} key={index} style={{ transitionDelay: `${index * 200}ms` }}>
                      <ListItem sx={{ mb: 2, p: 0 }}>
                        <Box sx={{ 
                          width: '100%', 
                          p: 1.5, 
                          borderRadius: 2,
                          bgcolor: index === 0 ? 'rgba(255, 193, 7, 0.08)' : 'background.default',
                          border: '1px solid',
                          borderColor: index === 0 ? 'warning.main' : 'divider',
                        }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Avatar sx={{ 
                              bgcolor: index === 0 ? 'warning.main' : 'primary.main',
                              mr: 1.5,
                              width: 36,
                              height: 36
                            }}>
                              {index + 1}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle1" fontWeight={600}>
                                {dept.name}
                              </Typography>
                              <Typography variant="body2" color="success.main" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                                <TrendingDownIcon sx={{ fontSize: 16, mr: 0.5 }} />
                                Redução: {dept.reduction}
                              </Typography>
                            </Box>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                ml: 'auto', 
                                fontWeight: 600,
                                bgcolor: index === 0 ? 'warning.main' : 'primary.main',
                                color: 'white',
                                px: 1,
                                py: 0.5,
                                borderRadius: 1
                              }}
                            >
                              {dept.score} pts
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                            {dept.achievements.map((achievement, i) => (
                              <Tooltip key={i} title={achievement}>
                                <Chip 
                                  icon={<EmojiEventsIcon />} 
                                  label={achievement} 
                                  size="small" 
                                  color={index === 0 ? "warning" : "primary"}
                                  variant="outlined"
                                  sx={{ 
                                    borderRadius: '12px',
                                    '& .MuiChip-icon': { 
                                      fontSize: '1rem' 
                                    }
                                  }}
                                />
                              </Tooltip>
                            ))}
                          </Box>
                        </Box>
                      </ListItem>
                    </Zoom>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 