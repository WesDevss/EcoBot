import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Chip,
  Stack,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  MenuItem,
  Button,
  IconButton,
  Tooltip,
  Avatar,
  Divider,
  Switch,
  FormControlLabel,
  Badge,
  Fade,
  Zoom
} from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CloudIcon from '@mui/icons-material/Cloud';
import StorageIcon from '@mui/icons-material/Storage';
import SpeedIcon from '@mui/icons-material/Speed';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FilterListIcon from '@mui/icons-material/FilterList';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadIcon from '@mui/icons-material/Download';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import EmailIcon from '@mui/icons-material/Email';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MetricsCard from '../components/MetricsCard';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

// Dados mockados para os gráficos
const dadosMensais = [
  { nome: 'Jan', consumoEnergia: 1800, emissoesCarbonoFR: 250, armazenamento: 700 },
  { nome: 'Fev', consumoEnergia: 1750, emissoesCarbonoFR: 240, armazenamento: 650 },
  { nome: 'Mar', consumoEnergia: 1700, emissoesCarbonoFR: 230, armazenamento: 600 },
  { nome: 'Abr', consumoEnergia: 1650, emissoesCarbonoFR: 220, armazenamento: 550 },
  { nome: 'Mai', consumoEnergia: 1600, emissoesCarbonoFR: 210, armazenamento: 520 },
  { nome: 'Jun', consumoEnergia: 0, emissoesCarbonoFR: 200, armazenamento: 500 },
];

const dadosHistoricos = [
  { nome: '2021', consumoEnergia: 2400, emissoesCarbonoFR: 300, armazenamento: 900 },
  { nome: '2022', consumoEnergia: 2200, emissoesCarbonoFR: 280, armazenamento: 850 },
  { nome: '2023', consumoEnergia: 2000, emissoesCarbonoFR: 260, armazenamento: 800 },
  { nome: '2024', consumoEnergia: 1600, emissoesCarbonoFR: 200, armazenamento: 500 },
];

const dadosDetalhadosEnergia = [
  { nome: 'Servidores', valor: 45 },
  { nome: 'Armazenamento', valor: 25 },
  { nome: 'Computadores', valor: 20 },
  { nome: 'Outros', valor: 10 },
];

const CORES = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Metrics = ({ mockData }) => {
  const [periodoTempo, setPeriodoTempo] = useState('mensal');
  const [tipoMetrica, setTipoMetrica] = useState('todas');
  const [mostrarComparacao, setMostrarComparacao] = useState(false);
  const [atualizando, setAtualizando] = useState(false);
  const [valorAba, setValorAba] = useState(0);

  // Se não recebermos mockData do componente pai, usamos nossos dados padrão
  const metricas = mockData?.metrics || {
    consumoEnergia: {
      atual: 0,
      anterior: 1800,
      reducao: 100,
      unidade: 'kWh',
      impacto: 'Redução significativa no consumo',
      icone: (<SpeedIcon />),
      cor: '#1B3B36',
      dados: dadosMensais.map(item => ({ nome: item.nome, valor: item.consumoEnergia }))
    },
    emissoesCarbonoFR: {
      atual: 200,
      anterior: 250,
      reducao: 20,
      unidade: 'tCO2',
      impacto: 'Redução de emissões',
      icone: (<CloudIcon />),
      cor: '#2e7d32',
      dados: dadosMensais.map(item => ({ nome: item.nome, valor: item.emissoesCarbonoFR }))
    },
    armazenamentoDigital: {
      atual: 500,
      anterior: 700,
      reducao: 28.6,
      unidade: 'GB',
      impacto: 'Otimização de armazenamento',
      icone: (<StorageIcon />),
      cor: '#4CAF50',
      dados: dadosMensais.map(item => ({ nome: item.nome, valor: item.armazenamento }))
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
  };

  const handleRefresh = () => {
    setAtualizando(true);
    // Simulação de atualização dos dados
    setTimeout(() => {
      setAtualizando(false);
    }, 1500);
  };

  const handleTimeRangeChange = (event) => {
    setPeriodoTempo(event.target.value);
  };

  const handleMetricTypeChange = (event) => {
    setTipoMetrica(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setValorAba(newValue);
  };

  // Filtragem de métricas baseada no tipo selecionado
  const metricasFiltradas = Object.entries(metricas).filter(([key, value]) => {
    if (tipoMetrica === 'todas') return true;
    return key === tipoMetrica;
  });

  return (
    <Box>
      {/* Cabeçalho da página */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component="img"
            src="/ecobot-logo.png"
            alt="Logo EcoBot"
            sx={{ 
              width: 48, 
              height: 48, 
              mr: 2,
              objectFit: 'contain',
              borderRadius: '8px'
            }}
          />
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 0.5, display: 'flex', alignItems: 'center' }}>
              Métricas
              <Badge 
                badgeContent="Ao vivo" 
                color="error"
                sx={{ ml: 2 }}
              />
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Monitoramento detalhado de consumo e impacto ambiental digital
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Atualizar dados">
            <IconButton 
              onClick={handleRefresh} 
              color="primary"
              disabled={atualizando}
            >
              <RefreshIcon sx={atualizando ? { animation: 'spin 1s linear infinite' } : {}} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Exportar relatório">
            <IconButton color="primary">
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Filtros e controles */}
      <Card sx={{ mb: 4, borderRadius: 2, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                select
                fullWidth
                label="Período"
                value={periodoTempo}
                onChange={handleTimeRangeChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DateRangeIcon color="action" />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 2 }
                }}
              >
                <MenuItem value="diario">Diário</MenuItem>
                <MenuItem value="semanal">Semanal</MenuItem>
                <MenuItem value="mensal">Mensal</MenuItem>
                <MenuItem value="anual">Anual</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                select
                fullWidth
                label="Tipo de Métrica"
                value={tipoMetrica}
                onChange={handleMetricTypeChange}
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
                <MenuItem value="todas">Todas as Métricas</MenuItem>
                <MenuItem value="consumoEnergia">Consumo de Energia</MenuItem>
                <MenuItem value="emissoesCarbonoFR">Emissões de Carbono</MenuItem>
                <MenuItem value="armazenamentoDigital">Armazenamento Digital</MenuItem>
                <MenuItem value="impactoEmail">Impacto de E-mails</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <FormControlLabel 
                  control={
                    <Switch 
                      checked={mostrarComparacao} 
                      onChange={(e) => setMostrarComparacao(e.target.checked)} 
                      color="primary" 
                    />
                  } 
                  label="Comparar com período anterior" 
                />
                <Button 
                  variant="outlined" 
                  startIcon={<FilterListIcon />}
                  sx={{ ml: 2 }}
                >
                  Mais Filtros
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tabs para diferentes visões */}
      <Box sx={{ mb: 4 }}>
        <Tabs
          value={valorAba}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              fontWeight: 600,
              textTransform: 'none',
              minWidth: 'auto',
              px: 3,
              py: 1.5
            }
          }}
        >
          <Tab 
            icon={<TimelineIcon sx={{ mr: 1 }} />} 
            iconPosition="start" 
            label="Visão Geral" 
          />
          <Tab 
            icon={<SpeedIcon sx={{ mr: 1 }} />} 
            iconPosition="start" 
            label="Consumo de Energia" 
          />
          <Tab 
            icon={<CloudIcon sx={{ mr: 1 }} />} 
            iconPosition="start" 
            label="Emissões de Carbono" 
          />
          <Tab 
            icon={<StorageIcon sx={{ mr: 1 }} />} 
            iconPosition="start" 
            label="Armazenamento" 
          />
          <Tab 
            icon={<EmailIcon sx={{ mr: 1 }} />} 
            iconPosition="start" 
            label="Impacto de E-mails" 
          />
        </Tabs>
      </Box>

      {/* Cards de métricas principais */}
      {valorAba === 0 && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {metricasFiltradas.map(([key, value], index) => (
            <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }} key={key}>
              <Grid item xs={12} sm={6} md={3}>
                <MetricsCard
                  title={key}
                  value={value.atual}
                  unit={value.unidade}
                  reduction={value.reducao}
                  previous={value.anterior}
                  impact={value.impacto}
                  icone={value.icone}
                  cor={value.cor}
                  data={value.dados}
                />
              </Grid>
            </Zoom>
          ))}
        </Grid>
      )}

      {/* Visão Geral - Gráficos e Detalhamentos */}
      {valorAba === 0 && (
        <Grid container spacing={3}>
          {/* Gráfico de Linha - Tendências */}
          <Grid item xs={12} lg={8}>
            <Fade in={true} timeout={800}>
              <Card sx={{ borderRadius: 2, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TimelineIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="h6">Tendências de Consumo ao Longo do Tempo</Typography>
                    </Box>
                  }
                  action={
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Box sx={{ height: 400 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={periodoTempo === 'anual' ? dadosHistoricos : dadosMensais}
                        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                        <XAxis 
                          dataKey="nome" 
                          tick={{ fill: '#666' }}
                          axisLine={{ stroke: '#e0e0e0' }}
                          tickLine={false}
                        />
                        <YAxis 
                          yAxisId="left"
                          tick={{ fill: '#666' }}
                          axisLine={{ stroke: '#e0e0e0' }}
                          tickLine={false}
                        />
                        <YAxis 
                          yAxisId="right"
                          orientation="right"
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
                          yAxisId="left"
                          type="monotone" 
                          dataKey="consumoEnergia" 
                          name="Consumo de Energia (kWh)" 
                          stroke="#1B3B36" 
                          strokeWidth={3}
                          dot={{ r: 6, strokeWidth: 2, stroke: "#1B3B36", fill: "white" }}
                          activeDot={{ r: 8, strokeWidth: 2 }}
                        />
                        <Line 
                          yAxisId="right"
                          type="monotone" 
                          dataKey="emissoesCarbonoFR" 
                          name="Emissões de CO2 (tCO2)" 
                          stroke="#2e7d32" 
                          strokeWidth={3}
                          dot={{ r: 6, strokeWidth: 2, stroke: "#2e7d32", fill: "white" }}
                          activeDot={{ r: 8, strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>

          {/* Distribuição de Energia */}
          <Grid item xs={12} md={6} lg={4}>
            <Fade in={true} timeout={1000}>
              <Card sx={{ borderRadius: 2, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <SpeedIcon sx={{ mr: 1, color: '#1B3B36' }} />
                      <Typography variant="h6">Distribuição de Consumo</Typography>
                    </Box>
                  }
                  action={
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Box sx={{ height: 300, position: 'relative' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={dadosDetalhadosEnergia}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ nome, percent }) => `${nome}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="valor"
                        >
                          {dadosDetalhadosEnergia.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip 
                          contentStyle={{ 
                            background: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                          }}
                          formatter={(valor) => [`${valor}%`, 'Consumo']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    {dadosMensais[5].consumoEnergia === 0 && (
                      <Box sx={{ 
                        position: 'absolute', 
                        top: '50%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10,
                        bgcolor: 'background.paper',
                        p: 2,
                        borderRadius: 2,
                        boxShadow: 3,
                        textAlign: 'center'
                      }}>
                        <EmojiNatureIcon color="success" sx={{ fontSize: 48, mb: 1 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          Consumo Zero!
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Parabéns! Você atingiu consumo zero neste mês.
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>

          {/* Histórico de Armazenamento */}
          <Grid item xs={12} md={6} lg={6}>
            <Fade in={true} timeout={1200}>
              <Card sx={{ borderRadius: 2, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <StorageIcon sx={{ mr: 1, color: '#4CAF50' }} />
                      <Typography variant="h6">Evolução do Armazenamento</Typography>
                    </Box>
                  }
                  action={
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={periodoTempo === 'anual' ? dadosHistoricos : dadosMensais}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorStorage" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#4CAF50" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                        <XAxis 
                          dataKey="nome" 
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
                          formatter={(valor) => [`${valor} GB`, 'Armazenamento']}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="armazenamento" 
                          name="Armazenamento (GB)"
                          stroke="#4CAF50" 
                          fillOpacity={1} 
                          fill="url(#colorStorage)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>

          {/* Impacto de Reduções */}
          <Grid item xs={12} md={6} lg={6}>
            <Fade in={true} timeout={1400}>
              <Card sx={{ borderRadius: 2, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CloudIcon sx={{ mr: 1, color: '#2e7d32' }} />
                      <Typography variant="h6">Impacto das Reduções</Typography>
                    </Box>
                  }
                  action={
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { nome: 'Energia', reducao: 1800, equivalente: 'Emissões de 1 carro por 1 ano' },
                          { nome: 'Emissões', reducao: 50, equivalente: '50 árvores preservadas' },
                          { nome: 'Armazenamento', reducao: 200, equivalente: '50kg de resíduos eletrônicos' },
                          { nome: 'E-mails', reducao: 3000, equivalente: '125 kg CO2 evitados' },
                        ]}
                        layout="vertical" 
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                        <XAxis type="number" />
                        <YAxis 
                          dataKey="nome" 
                          type="category" 
                          scale="band"
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
                          formatter={(valor, nome, props) => {
                            if (nome === 'reducao') {
                              const unidades = {
                                Energia: 'kWh',
                                Emissões: 'tCO2',
                                Armazenamento: 'GB',
                                'E-mails': 'e-mails'
                              };
                              return [`${valor} ${unidades[props.payload.nome]}`, 'Redução'];
                            }
                            return [props.payload.equivalente, 'Equivalente a'];
                          }}
                        />
                        <Bar 
                          dataKey="reducao"
                          name="Redução"
                          fill="#156560" 
                          radius={[0, 4, 4, 0]}
                          barSize={30}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        </Grid>
      )}

      {/* Conteúdo das outras abas (consumo, emissões, etc.) */}
      {valorAba !== 0 && (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <EmojiNatureIcon sx={{ fontSize: 64, color: 'primary.main', opacity: 0.6, mb: 2 }} />
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
            {valorAba === 1 && "Análise Detalhada de Consumo de Energia"}
            {valorAba === 2 && "Análise Detalhada de Emissões de Carbono"}
            {valorAba === 3 && "Análise Detalhada de Armazenamento"}
            {valorAba === 4 && "Análise Detalhada do Impacto de E-mails"}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Dados em atualização...
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Button 
              variant="outlined" 
              color="primary"
              startIcon={<RefreshIcon />}
            >
              Atualizar Dados
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Metrics; 