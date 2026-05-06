import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Layout.css';

function Layout({ title, children }) {
  const location = useLocation();
  const { theme } = useApp();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/qualidade-do-ar', label: 'Qualidade do Ar' },
    { path: '/chatbot', label: 'Chatbot ESG' },
    { path: '/historico', label: 'Histórico ESG' },
    { path: '/perfil', label: 'Perfil' },
    { path: '/configuracoes', label: 'Configurações' },
  ];

  return (
    <div className={`layout ${theme === 'dark' ? 'dark-theme' : ''}`}>
      <aside className="sidebar">
        <div className="sidebar-header">
          <img
            src="/logo.png"
            alt="EcoBot"
            className="sidebar-logo"
          />
          <span className="sidebar-title">EcoBot</span>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="sidebar-link-text">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <div className="main-content">
        <main className="page-container">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
