import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Divider,
  IconButton,
  InputAdornment,
  Alert,
  Container,
  Avatar,
  Grid,
  Card,
  CardMedia,
  Collapse,
  Zoom,
  Fade
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import MicrosoftIcon from '@mui/icons-material/Window';
import GitHubIcon from '@mui/icons-material/GitHub';
import EcoIcon from '@mui/icons-material/EmojiNature';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import StorageIcon from '@mui/icons-material/Storage';
import DevicesIcon from '@mui/icons-material/Devices';
import EmailIcon from '@mui/icons-material/Email';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      setLoading(true);
      
      // Simulação de login com delay para mostrar loading
      setTimeout(() => {
        // Aqui você implementaria a lógica real de autenticação
        login({
          email: formData.email,
          name: 'Usuário Teste',
          role: 'admin'
        });
        navigate('/');
        setLoading(false);
      }, 1000);
    } else {
      setError('Por favor, preencha todos os campos');
    }
  };

  const handleSocialLogin = (provider) => {
    // Aqui você implementaria a lógica de autenticação social
    console.log(`Login com ${provider}`);
  };
  
  // Lista de benefícios do EcoBot
  const benefits = [
    { icon: <CloudDoneIcon />, text: "Reduza emissões de carbono digital" },
    { icon: <StorageIcon />, text: "Otimize armazenamento em nuvem" },
    { icon: <DevicesIcon />, text: "Monitore consumo energético" },
    { icon: <EmailIcon />, text: "Diminua impacto de emails" }
  ];

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      {/* Seção da imagem - visível apenas em telas médias e grandes */}
      <Grid
        item
        xs={false}
        sm={false}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?sustainability)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(21, 101, 96, 0.6)',
            backdropFilter: 'blur(1px)',
          }
        }}
      >
        <Box
          sx={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 4,
            color: '#fff',
            zIndex: 1
          }}
        >
          <Zoom in={true} style={{ transitionDelay: '300ms' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Box
                component="img"
                src="/ecobot-logo.png"
                alt="EcoBot Logo"
                sx={{
                  height: 120,
                  objectFit: 'contain'
                }}
              />
            </Box>
          </Zoom>
          
          <Fade in={true} timeout={1000}>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 4, 
                textAlign: 'center',
                fontWeight: 300,
                maxWidth: '80%'
              }}
            >
              Sua plataforma de monitoramento e sustentabilidade digital
            </Typography>
          </Fade>
          
          <Box sx={{ width: '100%', maxWidth: 500 }}>
            {benefits.map((benefit, index) => (
              <Fade 
                in={true} 
                timeout={1000} 
                style={{ transitionDelay: `${500 + (index * 200)}ms` }}
                key={index}
              >
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 2,
                  p: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 2,
                  backdropFilter: 'blur(5px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    transform: 'translateY(-2px)'
                  }
                }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: 'rgba(76, 175, 80, 0.8)', 
                      color: '#fff',
                      mr: 2
                    }}
                  >
                    {benefit.icon}
                  </Avatar>
                  <Typography variant="body1">{benefit.text}</Typography>
                </Box>
              </Fade>
            ))}
          </Box>
        </Box>
      </Grid>
      
      {/* Seção do formulário de login */}
      <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} square sx={{ 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <Container maxWidth="xs">
          <Fade in={true} timeout={800}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                py: 8
              }}
            >
              <Avatar 
                sx={{ 
                  m: 1, 
                  bgcolor: 'primary.main',
                  width: 56,
                  height: 56
                }}
              >
                <LockOutlinedIcon fontSize="large" />
              </Avatar>

              <Typography 
                component="h1" 
                variant="h4" 
                sx={{ 
                  mb: 1,
                  fontWeight: 700
                }}
              >
                Bem-vindo
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
                Faça login para acessar sua conta e monitorar seu impacto ambiental digital
              </Typography>

              <Collapse in={Boolean(error)} sx={{ width: '100%', mb: 2 }}>
                <Alert 
                  severity="error" 
                  sx={{ 
                    width: '100%',
                    borderRadius: 2,
                    boxShadow: '0 2px 12px rgba(211, 47, 47, 0.1)'
                  }}
                >
                  {error}
                </Alert>
              </Collapse>

              <Box 
                component="form" 
                onSubmit={handleSubmit} 
                sx={{ 
                  width: '100%',
                  '& .MuiTextField-root': {
                    mb: 2
                  }
                }}
              >
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{
                    sx: { borderRadius: 2 }
                  }}
                />

                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{
                    sx: { borderRadius: 2 },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{ 
                    mt: 1, 
                    mb: 2,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(21, 101, 96, 0.2)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::after': loading ? {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                      animation: 'loading 1.5s infinite',
                    } : {},
                    '@keyframes loading': {
                      '0%': { transform: 'translateX(-100%)' },
                      '100%': { transform: 'translateX(100%)' }
                    }
                  }}
                >
                  {loading ? 'Entrando...' : 'Entrar'}
                </Button>

                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  mb: 2,
                  px: 0.5
                }}>
                  <Link 
                    href="#" 
                    variant="body2" 
                    sx={{ 
                      fontSize: '0.875rem',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        color: 'primary.main',
                      }
                    }}
                  >
                    Esqueceu sua senha?
                  </Link>
                  <Link 
                    href="#" 
                    variant="body2"
                    sx={{ 
                      fontSize: '0.875rem',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        color: 'primary.main',
                      }
                    }}
                  >
                    Criar uma conta
                  </Link>
                </Box>

                <Divider sx={{ 
                  my: 3,
                  '&::before, &::after': {
                    borderColor: 'rgba(0, 0, 0, 0.08)',
                  }
                }}>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ px: 1 }}
                  >
                    ou continue com
                  </Typography>
                </Divider>

                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  gap: 2 
                }}>
                  <Zoom in={true} style={{ transitionDelay: '200ms' }}>
                    <IconButton
                      sx={{
                        bgcolor: '#DB4437',
                        color: 'white',
                        '&:hover': { 
                          bgcolor: '#C53929',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.2s ease',
                        width: 48,
                        height: 48,
                      }}
                      onClick={() => handleSocialLogin('Google')}
                    >
                      <GoogleIcon />
                    </IconButton>
                  </Zoom>

                  <Zoom in={true} style={{ transitionDelay: '300ms' }}>
                    <IconButton
                      sx={{
                        bgcolor: '#2F2F2F',
                        color: 'white',
                        '&:hover': { 
                          bgcolor: '#000000',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.2s ease',
                        width: 48,
                        height: 48,
                      }}
                      onClick={() => handleSocialLogin('GitHub')}
                    >
                      <GitHubIcon />
                    </IconButton>
                  </Zoom>

                  <Zoom in={true} style={{ transitionDelay: '400ms' }}>
                    <IconButton
                      sx={{
                        bgcolor: '#0078D4',
                        color: 'white',
                        '&:hover': { 
                          bgcolor: '#106EBE',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.2s ease',
                        width: 48,
                        height: 48,
                      }}
                      onClick={() => handleSocialLogin('Microsoft')}
                    >
                      <MicrosoftIcon />
                    </IconButton>
                  </Zoom>
                </Box>
                
                <Typography 
                  variant="caption" 
                  color="text.secondary" 
                  align="center" 
                  sx={{ 
                    display: 'block',
                    mt: 3
                  }}
                >
                  © {new Date().getFullYear()} EcoBot - Sustentabilidade Digital
                </Typography>
              </Box>
            </Box>
          </Fade>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Login; 