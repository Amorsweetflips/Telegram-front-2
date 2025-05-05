// File: src/App.js

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './theme';
import { AuthProvider, useAuth } from './AuthContext';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import SuggestionCarousel from './components/SuggestionCarousel';
import ChatInput from './components/ChatInput';
import SignIn from './components/SignIn';
import { getChatMessages } from './api';
import { useWebSocket } from './hooks/useWebSocket';

function Dashboard({ currentChat }) {
  const { token, logout } = useAuth();
  const [messages, setMessages] = useState([]);
  const [lastMsg, setLastMsg] = useState('');

  // Load messages when chat changes
  useEffect(() => {
    if (!currentChat) return;
    getChatMessages(currentChat, token).then((msgs) => {
      setMessages(msgs);
      setLastMsg(msgs[msgs.length - 1]?.message || '');
    });
  }, [currentChat, token]);

  // Build the WS URL only when we have a valid chat
  const wsUrl = currentChat
    ? `${process.env.REACT_APP_API_URL.replace(/\/+$/, '')}/ws/${currentChat}`
    : null;

  // Real-time updates via WebSocket (Option A guard)
  useWebSocket(wsUrl, token, (newMsg) => {
    setMessages((prev) => [...prev, newMsg]);
    setLastMsg(newMsg.message);
  });

  if (!currentChat) {
    return <div style={{ padding: '2rem' }}>Select a chat from the sidebar.</div>;
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '1rem', background: theme.colors.surface }}>
        <button onClick={logout} style={{ float: 'right' }}>Sign Out</button>
        <h2 style={{ margin: 0, color: theme.colors.text }}>{currentChat}</h2>
      </header>

      <ChatWindow messages={messages} />

      <SuggestionCarousel
        chatName={currentChat}
        lastMessage={lastMsg}
        onChoose={(opt) => {
          setMessages((prev) => [
            ...prev,
            { id: Date.now(), sender_username: '<you>', message: opt },
          ]);
          setLastMsg(opt);
        }}
      />

      <ChatInput
        chatName={currentChat}
        onSent={(text) => setLastMsg(text)}
      />
    </div>
  );
}

function AppInner() {
  const { token, login } = useAuth();
  const [currentChat, setCurrentChat] = useState(null);

  if (!token) {
    return <SignIn onLogin={login} />;
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar selected={currentChat} onSelect={setCurrentChat} />
      <Dashboard currentChat={currentChat} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppInner />
      </ThemeProvider>
    </AuthProvider>
  );
}
