import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();
const ADMIN_EMAIL = 'admin@ecobot.com';
const ADMIN_PASSWORD = 'admin123';
const DEFAULT_USERS = [
  {
    name: 'Administrador EcoBot',
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    role: 'Administrador',
    avatar: '/logo.png',
    joinedDate: new Date().toLocaleDateString('pt-BR'),
  },
];

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ecobot-theme') || 'light';
  });

  const [notifications, setNotifications] = useState(() => {
    return JSON.parse(localStorage.getItem('ecobot-notifications')) ?? true;
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('ecobot-language') || 'pt-BR';
  });

  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('ecobot-user')) || {
      name: 'Usuário EcoBot',
      email: 'usuario@ecobot.com',
      role: 'Administrador',
      avatar: '/logo.png',
      joinedDate: new Date().toLocaleDateString('pt-BR'),
    };
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('ecobot-authenticated') === 'true';
  });
  const [users, setUsers] = useState(() => {
    const storedUsers = JSON.parse(localStorage.getItem('ecobot-users')) || [];
    const hasAdmin = storedUsers.some(
      (storedUser) => storedUser.email?.toLowerCase() === ADMIN_EMAIL
    );

    return hasAdmin ? storedUsers : [...DEFAULT_USERS, ...storedUsers];
  });

  useEffect(() => {
    localStorage.setItem('ecobot-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('ecobot-notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('ecobot-language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('ecobot-user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('ecobot-authenticated', String(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('ecobot-users', JSON.stringify(users));
  }, [users]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const login = ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const matchedUser = users.find(
      (registeredUser) =>
        registeredUser.email?.toLowerCase() === normalizedEmail &&
        registeredUser.password === password
    );

    if (!matchedUser) return false;

    setUser({
      name: matchedUser.name,
      email: matchedUser.email,
      role: matchedUser.role || 'Usuário',
      avatar: matchedUser.avatar || '/logo.png',
      joinedDate: matchedUser.joinedDate || new Date().toLocaleDateString('pt-BR'),
    });
    setIsAuthenticated(true);
    return true;
  };
  const logout = () => setIsAuthenticated(false);
  const registerUser = ({ name, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (users.some((registeredUser) => registeredUser.email?.toLowerCase() === normalizedEmail)) {
      return { success: false, message: 'Este email já está cadastrado.' };
    }

    const newUser = {
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: 'Usuário',
      avatar: '/logo.png',
      joinedDate: new Date().toLocaleDateString('pt-BR'),
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);
    return { success: true };
  };

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme,
      notifications,
      setNotifications,
      language,
      setLanguage,
      user,
      setUser,
      isAuthenticated,
      login,
      logout,
      registerUser,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
