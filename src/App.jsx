import React from 'react';
import AppLayout from './ui/telegram-web/AppLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<ChatList />} />
          <Route path="/chats/:chatName" element={<ChatWindow />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
