import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  LinearProgress,
  Tooltip,
  IconButton,
  Divider,
  Fade,
  Zoom
} from '@mui/material';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SpeedIcon from '@mui/icons-material/Speed'; // Ícone padrão
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const formatarTitulo = (titulo) => {
  return titulo
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
};

const MetricsCard = (props) => {
  // Suporte a ambos os formatos de props (inglês e português)
  const { 
    title, 
    value, 
    unit = props.unidade, 
    reduction = props.reducao, 
    previous = props.anterior, 
    impact = props.impacto,
    icone = props.icon,
    cor = props.color || '#1B3B36',
    data = props.dados || [] 
  } = props;

  const ehPositivo = reduction > 0;
  const tituloFormatado = formatarTitulo(title);
  
  // Calcular a meta de forma mais precisa baseado no valor atual
  const valorMeta = Math.round(value * (ehPositivo ? 0.9 : 1.1));
  
  // Calcular a progressão para a meta
  const porcentagemProgresso = ehPositivo 
    ? Math.min(100, (reduction / 10) * 100) 
    : Math.max(0, 100 - (Math.abs(reduction) / 10) * 100);

  // Renderização do ícone com verificação de segurança
  const renderIcon = () => {
    // Usar ícone padrão se nenhum for fornecido
    if (!icone) {
      return <SpeedIcon style={{ color: cor, fontSize: 28 }} />;
    }
    
    // Verificar se o ícone é um elemento React válido
    try {
      return React.cloneElement(icone, { 
        sx: { color: cor, fontSize: 28 } 
      });
    } catch (error) {
      console.warn('Erro ao clonar o elemento do ícone:', error);
      return <SpeedIcon style={{ color: cor, fontSize: 28 }} />;
    }
  };

  return (
    <Zoom in={true} style={{ transitionDelay: '100ms' }}>
      <Card sx={{ 
        height: '100%',
        position: 'relative',
        overflow: 'visible',
        borderRadius: '16px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${cor} 0%, ${cor}88 100%)`,
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }
      }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: '12px',
              bgcolor: `${cor}15`,
              mr: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: `${cor}25`,
                transform: 'scale(1.05)'
              }
            }}>
              {renderIcon()}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                {tituloFormatado}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {impact}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Tooltip 
                title="Comparativo com período anterior" 
                placement="top"
                arrow
              >
                <InfoOutlinedIcon sx={{ color: 'text.secondary', opacity: 0.5 }} />
              </Tooltip>
              <IconButton size="small" sx={{ 
                '&:hover': { bgcolor: `${cor}15` } 
              }}>
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Box>

          <Fade in={true} timeout={800}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
              <Typography variant="h3" component="div" sx={{ 
                fontWeight: 700,
                color: 'text.primary',
                mr: 1,
                letterSpacing: '-0.05em'
              }}>
                {value}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                {unit}
              </Typography>
            </Box>
          </Fade>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: ehPositivo ? 'success.main' : 'error.main',
              bgcolor: ehPositivo ? 'rgba(46, 125, 50, 0.1)' : 'rgba(211, 47, 47, 0.1)',
              py: 0.5,
              px: 1,
              borderRadius: '6px',
              mr: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                bgcolor: ehPositivo ? 'rgba(46, 125, 50, 0.2)' : 'rgba(211, 47, 47, 0.2)'
              }
            }}>
              {ehPositivo ? 
                <TrendingDownIcon sx={{ fontSize: 16, mr: 0.5 }} /> : 
                <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
              }
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {Math.abs(reduction)}%
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              vs. anterior: {previous} {unit}
            </Typography>
          </Box>

          {data && data.length > 0 && (
            <Box sx={{ height: 120, mb: 2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={cor} stopOpacity={0.4}/>
                      <stop offset="95%" stopColor={cor} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey={data[0]?.nome ? "nome" : "name"} 
                    stroke="#666" 
                    fontSize={12}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#666" 
                    fontSize={12}
                    axisLine={false}
                    tickLine={false}
                    width={30}
                  />
                  <RechartsTooltip 
                    contentStyle={{ 
                      background: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                    formatter={(valor, nome) => [`${valor} ${unit}`, tituloFormatado]}
                    labelFormatter={(rotulo) => `Mês: ${rotulo}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey={data[0]?.valor ? "valor" : "value"} 
                    stroke={cor} 
                    fill={`url(#gradient-${title})`}
                    strokeWidth={2}
                    activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          )}

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Meta: {valorMeta} {unit}
            </Typography>
            <Box sx={{ width: '60%' }}>
              <Tooltip
                title={`Progresso em relação à meta: ${Math.round(porcentagemProgresso)}%`}
                placement="top"
                arrow
              >
                <LinearProgress 
                  variant="determinate" 
                  value={porcentagemProgresso} 
                  color={ehPositivo ? "success" : "error"}
                  sx={{ 
                    height: 8,
                    borderRadius: 4,
                    bgcolor: 'rgba(0,0,0,0.05)',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                      transition: 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }
                  }}
                />
              </Tooltip>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Zoom>
  );
};

export default MetricsCard; 