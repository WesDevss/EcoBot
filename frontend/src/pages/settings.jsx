import React from 'react';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';
import './settings.css';

function Settings() {
  const {
    theme,
    toggleTheme,
    notifications,
    setNotifications,
    language,
    setLanguage,
  } = useApp();

  const clearData = () => {
    if (confirm('Tem certeza que deseja limpar todos os dados locais?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <Layout title="Configurações">
      <div className="settings-container">
        <div className="settings-card">
          <h3 className="card-title">Aparência</h3>
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Tema Escuro</span>
              <span className="setting-desc">Alternar entre claro e escuro</span>
            </div>
            <button
              className={`toggle-btn ${theme === 'dark' ? 'active' : ''}`}
              onClick={toggleTheme}
            >
              <span className="toggle-slider"></span>
            </button>
          </div>
        </div>

        <div className="settings-card">
          <h3 className="card-title">Notificações</h3>
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Ativar Notificações</span>
              <span className="setting-desc">Receber alertas sobre métricas ESG</span>
            </div>
            <button
              className={`toggle-btn ${notifications ? 'active' : ''}`}
              onClick={() => setNotifications(!notifications)}
            >
              <span className="toggle-slider"></span>
            </button>
          </div>
        </div>

        <div className="settings-card">
          <h3 className="card-title">Idioma</h3>
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Idioma do Sistema</span>
              <span className="setting-desc">Selecione o idioma preferido</span>
            </div>
            <select
              className="setting-select"
              value={language}
              onChange={e => setLanguage(e.target.value)}
            >
              <option value="pt-BR">Português (Brasil)</option>
              <option value="en-US">English (US)</option>
              <option value="es-ES">Español</option>
            </select>
          </div>
        </div>

        <div className="settings-card danger-zone">
          <h3 className="card-title danger-title">Zona de Perigo</h3>
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Limpar Dados Locais</span>
              <span className="setting-desc">Remove todas as preferências salvas</span>
            </div>
            <button className="danger-btn" onClick={clearData}>
              Limpar
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Settings;
