import React, { useEffect, useState } from 'react';
import { TelegramUI } from 'telegram-tt';
import { fetchMessages, sendMessage, loginWithTelegram } from '../api';

export default function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages().then(setMessages);
  }, []);

  return (
    <TelegramUI
      messages={messages}
      onSend={sendMessage}
      onLogin={loginWithTelegram}
      style={{ height: '100vh' }}
    />
  );
}
// Telegram-tt UI integration
