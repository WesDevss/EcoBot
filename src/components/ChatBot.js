import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  TextField, 
  IconButton, 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemText,
  Avatar,
  Chip,
  Fade,
  Zoom,
  CircularProgress,
  Divider,
  Tooltip
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import io from 'socket.io-client';

// Sugestões rápidas predefinidas
const QUICK_SUGGESTIONS = [
  "Como reduzir consumo de energia?",
  "Dicas para economizar armazenamento",
  "Como diminuir emissões de carbono?",
  "Explique o impacto do email",
  "Práticas de Green IT",
  "Otimização de processos digitais",
  "Impacto ambiental da IA",
  "Ciclo de vida de equipamentos",
  "Data centers sustentáveis"
];

// Respostas pré-prontas para consultas comuns
const PRE_DEFINED_RESPONSES = {
  "como reduzir consumo de energia": "Para reduzir o consumo de energia, você pode implementar as seguintes medidas:\n\n1. Configure dispositivos para modo de economia de energia\n2. Desligue sistemas quando não estiverem em uso\n3. Utilize servidores virtualizados para otimizar recursos\n4. Implemente políticas de desligamento automático\n5. Migre para soluções em nuvem mais eficientes",
  
  "dicas para economizar armazenamento": "Para economizar armazenamento digital:\n\n1. Elimine arquivos duplicados com ferramentas automatizadas\n2. Arquive dados antigos em storages de menor custo\n3. Implemente políticas de retenção de dados\n4. Compacte arquivos quando possível\n5. Utilize formatos de arquivo otimizados",
  
  "como diminuir emissões de carbono": "Para diminuir emissões de carbono digital:\n\n1. Migre para provedores de nuvem com compromisso de energia renovável\n2. Otimize os algoritmos para maior eficiência\n3. Implemente práticas de desenvolvimento de código limpo\n4. Reduza transferência de dados desnecessária\n5. Monitore e estabeleça metas de redução de emissões",
  
  "explique o impacto do email": "O impacto ambiental do email:\n\n1. Cada email gera em média 4g de CO2\n2. Emails com anexos podem gerar até 50g de CO2\n3. Um funcionário médio envia/recebe ~120 emails por dia\n4. Uma empresa de 100 pessoas pode gerar ~24 toneladas de CO2/ano só com emails\n5. Reduzir emails desnecessários e usar links em vez de anexos diminui significativamente esse impacto",
  
  "práticas de green it": "Melhores práticas de Green IT:\n\n1. Otimize o ciclo de vida dos equipamentos de TI\n2. Implemente políticas de impressão sustentáveis\n3. Utilize fontes de energia renovável para data centers\n4. Adote práticas de desenvolvimento sustentável\n5. Monitore e estabeleça metas para redução de pegada de carbono\n6. Priorize fornecedores com compromissos ambientais",
  
  "otimização de processos digitais": "Para otimizar processos digitais de forma sustentável:\n\n1. Automatize fluxos de trabalho para reduzir redundâncias\n2. Implemente análise de dados para identificar ineficiências\n3. Reduza transferências desnecessárias de dados\n4. Utilize edge computing para processamento local quando viável\n5. Otimize consultas de banco de dados e armazenamento\n6. Considere o impacto energético no design de novos sistemas",
  
  "impacto ambiental da ia": "Impacto ambiental da IA:\n\n1. Treinamento de modelos de IA de grande escala pode emitir até 284 toneladas de CO2\n2. Um único treinamento pode consumir mais energia que 5 carros durante toda sua vida útil\n3. Utilize modelos pré-treinados quando possível\n4. Otimize algoritmos para menor consumo computacional\n5. Priorize provedores de nuvem com compromissos ambientais para hospedagem de modelos\n6. Realize treinamentos em horários de menor demanda energética",
  
  "ciclo de vida de equipamentos": "Gestão sustentável do ciclo de vida de equipamentos:\n\n1. Estenda a vida útil de dispositivos com manutenção preventiva\n2. Implemente programas de remanufatura e recondicionamento\n3. Garanta descarte responsável com parceiros certificados\n4. Adote políticas de BYOD (Bring Your Own Device) para reduzir aquisições\n5. Priorize fornecedores com práticas sustentáveis de manufatura\n6. Considere o TCO (Custo Total de Propriedade) nas decisões de aquisição",
  
  "data centers sustentáveis": "Práticas para data centers sustentáveis:\n\n1. Implemente sistemas de refrigeração eficientes (free cooling)\n2. Utilize energia renovável (solar, eólica, hidroelétrica)\n3. Otimize a densidade de servidores e virtualização\n4. Monitore e melhore o PUE (Power Usage Effectiveness)\n5. Adote design modular para expansão eficiente\n6. Reutilize o calor residual para outros processos\n7. Implemente sistemas inteligentes de gerenciamento de energia"
};

// Keywords para melhorar a correspondência das consultas
const RESPONSE_KEYWORDS = {
  "energia": "como reduzir consumo de energia",
  "consumo": "como reduzir consumo de energia",
  "power": "como reduzir consumo de energia",
  
  "armazenamento": "dicas para economizar armazenamento",
  "storage": "dicas para economizar armazenamento",
  "disco": "dicas para economizar armazenamento",
  "arquivos": "dicas para economizar armazenamento",
  
  "carbono": "como diminuir emissões de carbono",
  "co2": "como diminuir emissões de carbono",
  "emissões": "como diminuir emissões de carbono",
  "pegada": "como diminuir emissões de carbono",
  
  "email": "explique o impacto do email",
  "mensagens": "explique o impacto do email",
  "correio": "explique o impacto do email",
  
  "green it": "práticas de green it",
  "ti verde": "práticas de green it",
  "sustentável": "práticas de green it",
  
  "processos": "otimização de processos digitais",
  "workflow": "otimização de processos digitais",
  "fluxo": "otimização de processos digitais",
  
  "ia": "impacto ambiental da ia",
  "inteligência artificial": "impacto ambiental da ia",
  "machine learning": "impacto ambiental da ia",
  "ai": "impacto ambiental da ia",
  
  "equipamentos": "ciclo de vida de equipamentos",
  "hardware": "ciclo de vida de equipamentos",
  "dispositivos": "ciclo de vida de equipamentos",
  "computadores": "ciclo de vida de equipamentos",
  
  "data center": "data centers sustentáveis",
  "datacenter": "data centers sustentáveis",
  "servidor": "data centers sustentáveis",
  "nuvem": "data centers sustentáveis",
  "cloud": "data centers sustentáveis"
};

// Mensagem de boas-vindas do bot
const WELCOME_MESSAGE = "Olá! Sou o EcoBot, seu assistente para sustentabilidade digital. Como posso ajudar você hoje?";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: WELCOME_MESSAGE, isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const socket = useRef();
  const inputRef = useRef(null);

  useEffect(() => {
    socket.current = io('http://localhost:5000');

    socket.current.on('chat response', (response) => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { text: response, isBot: true }]);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getPreDefinedResponse = (message) => {
    const normalizedMessage = message.toLowerCase().trim();
    
    // Verificar correspondências exatas
    if (PRE_DEFINED_RESPONSES[normalizedMessage]) {
      return PRE_DEFINED_RESPONSES[normalizedMessage];
    }
    
    // Verificar por keywords
    for (const [keyword, responseKey] of Object.entries(RESPONSE_KEYWORDS)) {
      if (normalizedMessage.includes(keyword)) {
        return PRE_DEFINED_RESPONSES[responseKey];
      }
    }
    
    // Verificar correspondências parciais
    for (const key of Object.keys(PRE_DEFINED_RESPONSES)) {
      if (normalizedMessage.includes(key) || key.includes(normalizedMessage)) {
        return PRE_DEFINED_RESPONSES[key];
      }
    }
    
    return null;
  };

  const handleSend = (e) => {
    e?.preventDefault();
    if (input.trim()) {
      const userMessage = input;
      setMessages((prev) => [...prev, { text: userMessage, isBot: false }]);
      setInput('');
      
      // Verifica se existe uma resposta pré-definida
      const preDefinedResponse = getPreDefinedResponse(userMessage);
      
      if (preDefinedResponse) {
        // Se existe uma resposta pré-definida, usar ela diretamente (sem efeito de digitação)
        setMessages((prev) => [...prev, { text: preDefinedResponse, isBot: true }]);
      } else {
        // Se não existe, mostrar efeito de digitação por um tempo mínimo e enviar para o backend
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          socket.current.emit('chat message', userMessage);
        }, 100); // Tempo drasticamente reduzido para melhor experiência
      }
      
      // Foco no input após enviar mensagem
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
    }
  };
  
  const handleQuickSuggestion = (suggestion) => {
    setInput(suggestion);
    // Usar setTimeout para garantir que o navegador atualize o estado corretamente
    setTimeout(() => {
      handleSend();
    }, 10);
  };
  
  const handleReset = () => {
    setMessages([{ text: WELCOME_MESSAGE, isBot: true }]);
  };

  return (
    <Paper 
      elevation={3} 
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: 2
      }}
    >
      <Box sx={{ 
        p: 2, 
        bgcolor: 'primary.main', 
        color: 'primary.contrastText',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component="img"
            src="/ecobot-logo.png"
            alt="EcoBot Logo"
            sx={{
              height: 45,
              width: 'auto',
              objectFit: 'contain'
            }}
          />
        </Box>
        <Tooltip title="Reiniciar conversa">
          <IconButton 
            color="inherit" 
            onClick={handleReset}
            size="small"
          >
            <RestartAltIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Divider />
      
      <List sx={{ 
        flex: 1, 
        overflow: 'auto', 
        p: 2,
        bgcolor: '#f5f5f5' 
      }}>
        {messages.map((message, index) => (
          <Zoom 
            in={true} 
            key={index} 
            style={{ 
              transitionDelay: `${Math.min(index * 30, 100)}ms`,  // Redução drástica no atraso de transição
              transitionDuration: '100ms'  // Redução no tempo de animação
            }}
          >
            <ListItem 
              sx={{ 
                justifyContent: message.isBot ? 'flex-start' : 'flex-end',
                mb: 1
              }}
            >
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: message.isBot ? 'row' : 'row-reverse',
                  alignItems: 'flex-start',
                  maxWidth: '80%'
                }}
              >
                <Avatar 
                  sx={{ 
                    bgcolor: message.isBot ? 'primary.main' : 'secondary.main',
                    width: 32,
                    height: 32,
                    mr: message.isBot ? 1 : 0,
                    ml: message.isBot ? 0 : 1
                  }}
                >
                  {message.isBot ? <SmartToyIcon fontSize="small" /> : <PersonIcon fontSize="small" />}
                </Avatar>
                <Paper 
                  elevation={1}
                  sx={{ 
                    p: 1.5, 
                    borderRadius: 2,
                    bgcolor: message.isBot ? 'white' : 'primary.light',
                    color: message.isBot ? 'text.primary' : 'primary.contrastText',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  <Typography variant="body1">{message.text}</Typography>
                </Paper>
              </Box>
            </ListItem>
          </Zoom>
        ))}
        
        {isTyping && (
          <Fade in={isTyping} timeout={50}>
            <ListItem sx={{ justifyContent: 'flex-start' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: '80%' }}>
                <Avatar 
                  sx={{ 
                    bgcolor: 'primary.main',
                    width: 32,
                    height: 32,
                    mr: 1 
                  }}
                >
                  <SmartToyIcon fontSize="small" />
                </Avatar>
                <Paper elevation={1} sx={{ p: 1.5, borderRadius: 2 }}>
                  <CircularProgress size={20} thickness={4} />
                </Paper>
              </Box>
            </ListItem>
          </Fade>
        )}
        
        <div ref={messagesEndRef} />
      </List>
      
      <Box sx={{ p: 1.5, bgcolor: 'background.paper' }}>
        <Box sx={{ mb: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {QUICK_SUGGESTIONS.map((suggestion, index) => (
            <Chip
              key={index}
              label={suggestion}
              size="small"
              clickable
              color="primary"
              variant="outlined"
              onClick={() => handleQuickSuggestion(suggestion)}
              icon={<LightbulbIcon fontSize="small" />}
              sx={{ '&:hover': { bgcolor: 'primary.50' } }}
            />
          ))}
        </Box>
        
        <form onSubmit={handleSend} style={{ display: 'flex' }}>
          <TextField
            fullWidth
            placeholder="Pergunte sobre sustentabilidade digital..."
            variant="outlined"
            size="small"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            inputRef={inputRef}
            autoFocus
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <IconButton 
            color="primary" 
            type="submit" 
            sx={{ ml: 1 }} 
            disabled={!input.trim()}
          >
            <SendIcon />
          </IconButton>
        </form>
      </Box>
    </Paper>
  );
};

export default ChatBot; 