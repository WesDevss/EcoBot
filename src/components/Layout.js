import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Container,
  Tooltip,
  Switch,
  useMediaQuery,
  Paper,
  InputBase,
  ButtonBase,
  Zoom,
  Fade,
  ListItemButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SearchIcon from '@mui/icons-material/Search';
import BugReportIcon from '@mui/icons-material/BugReport';
import ChatBotIcon from '@mui/icons-material/SmartToy';
import LeafIcon from '@mui/icons-material/EmojiNature';

const drawerWidth = 280;

const Layout = ({ children, toggleTheme, darkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const [open, setOpen] = useState(true);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const handleOpenNotificationsMenu = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleCloseNotificationsMenu = () => {
    setAnchorElNotifications(null);
  };
  
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Buscando por:', searchValue);
    // Aqui implementaria a lógica de busca
    setSearchValue('');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Métricas', icon: <AssessmentIcon />, path: '/metricas' },
    { text: 'Sugestões', icon: <LightbulbIcon />, path: '/sugestoes' },
  ];
  
  const sidebarFooterItems = [
    { text: 'Configurações', icon: <SettingsIcon />, action: () => navigate('/configuracoes') },
    { text: 'Ajuda & Suporte', icon: <HelpOutlineIcon />, action: () => window.open('/help', '_blank') },
    { text: 'Reportar Problema', icon: <BugReportIcon />, action: () => navigate('/suporte') },
  ];
  
  // Notificações mockadas
  const notifications = [
    { id: 1, title: 'Novo relatório disponível', time: 'há 5 minutos' },
    { id: 2, title: 'Meta de economia atingida!', time: 'há 1 hora' },
    { id: 3, title: 'Atualização disponível', time: 'há 1 dia' },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          transition: (theme) =>
            theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: (theme) =>
              theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
          }),
          background: darkMode ? 'rgba(40, 44, 52, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          color: darkMode ? '#ffffff' : '#333333',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 2,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box 
            sx={{ 
              mr: 2, 
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center'
            }}
          >
            <Box
              component="img"
              src="/ecobot-logo.png"
              alt="EcoBot Logo"
              sx={{
                height: 40,
                mr: 1,
                borderRadius: '4px'
              }}
            />
          </Box>
          
          <Box 
            component="form" 
            onSubmit={handleSearchSubmit}
            sx={{ 
              display: { xs: 'none', md: 'flex' },
              borderRadius: '24px',
              bgcolor: 'background.paper',
              boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
              mr: 2,
              flex: 1,
              maxWidth: 400,
              p: '2px 10px',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 3px 8px rgba(0,0,0,0.12)'
              }
            }}
          >
            <IconButton type="submit" sx={{ p: '6px' }}>
              <SearchIcon />
            </IconButton>
            <InputBase
              placeholder="Buscar..."
              inputProps={{ 'aria-label': 'buscar' }}
              sx={{ ml: 1, flex: 1 }}
              value={searchValue}
              onChange={handleSearchChange}
            />
          </Box>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mr: { xs: 1, md: 3 },
              color: darkMode ? 'primary.light' : 'primary.main'
            }}>
              <Tooltip title={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}>
                <ButtonBase 
                  sx={{ 
                    borderRadius: '50%', 
                    p: 1,
                    '&:hover': {
                      bgcolor: 'action.hover'
                    }
                  }}
                  onClick={toggleTheme}
                >
                  {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </ButtonBase>
              </Tooltip>
            </Box>
            
            <Tooltip title="Assistente EcoBot">
              <IconButton 
                sx={{ 
                  color: '#9c27b0',
                  mr: { xs: 1, md: 2 }
                }}
                onClick={() => console.log('Abrir assistente')}
              >
                <ChatBotIcon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Notificações">
              <IconButton
                size="large"
                aria-label="mostrar notificações"
                color="inherit"
                onClick={handleOpenNotificationsMenu}
                sx={{ mr: { xs: 1, md: 2 } }}
              >
                <Badge badgeContent={notifications.length} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-notifications"
              anchorEl={anchorElNotifications}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNotifications)}
              onClose={handleCloseNotificationsMenu}
            >
              {notifications.map((notification) => (
                <MenuItem key={notification.id} onClick={handleCloseNotificationsMenu}>
                  <Box sx={{ width: 280 }}>
                    <Typography variant="subtitle2" component="div">
                      {notification.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {notification.time}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
              <Divider />
              <MenuItem onClick={handleCloseNotificationsMenu}>
                <Typography variant="body2" color="primary" sx={{ width: '100%', textAlign: 'center' }}>
                  Ver todas as notificações
                </Typography>
              </MenuItem>
            </Menu>
            
            <Tooltip title="Perfil e configurações">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 1 }}>
                <Avatar
                  alt="Foto de Perfil"
                  src="/static/images/avatar/1.jpg"
                  sx={{ 
                    width: 40, 
                    height: 40,
                    border: '2px solid',
                    borderColor: 'primary.main'
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={() => {handleCloseUserMenu(); navigate('/perfil')}}>
                <ListItemIcon>
                  <AccountCircleIcon fontSize="small" />
                </ListItemIcon>
                <Typography textAlign="center">Perfil</Typography>
              </MenuItem>
              <MenuItem onClick={() => {handleCloseUserMenu(); navigate('/configuracoes')}}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <Typography textAlign="center">Configurações</Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <Typography textAlign="center">Sair</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        onClose={handleDrawerClose}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          ...(open && {
            ...{
              width: drawerWidth,
              transition: (theme) =>
                theme.transitions.create('width', {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
              overflowX: 'hidden',
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                borderRight: '1px solid',
                borderColor: 'divider',
              },
            },
          }),
          ...(!open && {
            ...{
              transition: (theme) =>
                theme.transitions.create('width', {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
              width: theme => theme.spacing(9),
              overflowX: 'hidden',
              '& .MuiDrawer-paper': {
                width: theme => theme.spacing(9),
                boxSizing: 'border-box',
                borderRight: '1px solid',
                borderColor: 'divider',
              },
            },
          }),
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: (theme) => theme.spacing(2),
            ...{
              minHeight: 64,
            },
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            opacity: open ? 1 : 0,
            transition: 'opacity 0.3s'
          }}>
            <Box
              component="img"
              src="/ecobot-logo.png"
              alt="EcoBot Logo"
              sx={{
                height: 36,
                mr: 1,
                borderRadius: '4px'
              }}
            />
          </Box>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        <Divider />
        
        {open && (
          <Fade in={open}>
            <Box sx={{ p: 2 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  bgcolor: 'background.default',
                  borderRadius: 2,
                  border: '1px dashed',
                  borderColor: 'primary.main',
                  mb: 1
                }}
              >
                <Avatar
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 60, height: 60, mb: 1, boxShadow: '0 3px 10px rgba(0,0,0,0.2)' }}
                />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {user?.name || 'Usuário'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                  {user?.role || 'Administrador'}
                </Typography>
              </Paper>
            </Box>
          </Fade>
        )}
        
        <Divider />
        
        <List sx={{ pt: 1 }}>
          {menuItems.map((item) => (
            <ListItem 
              key={item.text} 
              disablePadding 
              sx={{ 
                display: 'block',
                mb: 0.5
              }}
            >
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  py: 1.5,
                  mx: 1,
                  borderRadius: 2,
                  '&.Mui-selected': {
                    bgcolor: darkMode ? 'rgba(144, 202, 249, 0.08)' : 'rgba(25, 118, 210, 0.08)',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: darkMode ? 'rgba(144, 202, 249, 0.12)' : 'rgba(25, 118, 210, 0.12)',
                    },
                  },
                  '&:hover': {
                    bgcolor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: location.pathname === item.path ? 'primary.main' : 'inherit'
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{ 
                    opacity: open ? 1 : 0,
                    '& .MuiTypography-root': {
                      fontWeight: location.pathname === item.path ? 600 : 400
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
        <Box sx={{ flexGrow: 1 }} />
        
        <Divider />
        
        <List>
          {open && sidebarFooterItems.map((item) => (
            <Fade in={open} key={item.text}>
              <ListItem 
                disablePadding 
                sx={{ 
                  display: 'block',
                  mb: 0.5
                }}
              >
                <ListItemButton
                  onClick={item.action}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    py: 1,
                    mx: 1,
                    borderRadius: 2,
                    '&:hover': {
                      bgcolor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    sx={{ 
                      opacity: open ? 1 : 0
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Fade>
          ))}
          
          <ListItem
            disablePadding
            sx={{ 
              display: 'block',
              mb: 0.5,
              mt: 1
            }}
          >
            <ListItemButton
              onClick={handleLogout}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                py: 1,
                mx: 1,
                borderRadius: 2,
                '&:hover': {
                  bgcolor: 'rgba(211, 47, 47, 0.04)',
                  color: 'error.main'
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: 'error.main'
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary="Sair"
                sx={{ 
                  opacity: open ? 1 : 0,
                  '& .MuiTypography-root': {
                    color: 'error.main'
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          pt: { xs: 10, md: 12 },
          background: darkMode 
            ? 'linear-gradient(180deg, rgba(40, 44, 52, 0.8) 0%, rgba(35, 39, 47, 1) 100%)' 
            : 'linear-gradient(180deg, rgba(250, 250, 250, 0.8) 0%, rgba(244, 246, 248, 1) 100%)',
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="xl">
          <Fade in={true} timeout={800}>
            <div>
              {children}
            </div>
          </Fade>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout; 