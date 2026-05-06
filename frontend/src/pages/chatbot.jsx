import React, { useState } from 'react';
import Layout from '../components/Layout';
import { getChatResponse } from '../data/chatbot.data';
import './chatbot.css';

function Chatbot() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Olá! Sou o EcoBot. Como posso ajudar com suas dúvidas sobre sustentabilidade e ESG?', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const botResponse = getChatResponse(input);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
      }]);
      setLoading(false);
    }, 500);
  };

  return (
    <Layout title="Chatbot ESG">
      <div className="chatbot-container">
        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`chat-message ${msg.sender}`}>
              <div className="chat-bubble">{msg.text}</div>
            </div>
          ))}
          {loading && (
            <div className="chat-message bot">
              <div className="chat-bubble loading">Digitando...</div>
            </div>
          )}
        </div>

        <form className="chat-input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Digite sua pergunta sobre sustentabilidade..."
            className="chat-input"
          />
          <button type="submit" className="chat-send-button" disabled={loading}>
            Enviar
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Chatbot;
