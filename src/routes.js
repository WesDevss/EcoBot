import DashboardIcon from '@mui/icons-material/Dashboard';
import TimelineIcon from '@mui/icons-material/Timeline';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ChatIcon from '@mui/icons-material/Chat';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import SettingsIcon from '@mui/icons-material/Settings';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    icon: DashboardIcon,
    description: 'Visão geral do sistema'
  },
  {
    path: '/metricas',
    name: 'Métricas',
    icon: TimelineIcon,
    description: 'Análise detalhada de métricas'
  },
  {
    path: '/sugestoes',
    name: 'Sugestões',
    icon: LocalOfferIcon,
    description: 'Sugestões de otimização'
  },
  {
    path: '/esg',
    name: 'ESG',
    icon: AssessmentIcon,
    description: 'Métricas e relatórios ESG'
  },
  {
    path: '/chat',
    name: 'Chat',
    icon: ChatIcon,
    description: 'Assistente virtual'
  },
  {
    path: '/integracoes',
    name: 'Integrações',
    icon: IntegrationInstructionsIcon,
    description: 'Gerenciar integrações'
  },
  {
    path: '/configuracoes',
    name: 'Configurações',
    icon: SettingsIcon,
    description: 'Configurações do sistema'
  }
];

export default routes; 