import React, { useEffect, useState } from 'react';
import api from './api';
import ChatWindow from './components/ChatWindow';
import ChatMessage from './components/ChatMessage';

function App() {
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    api.getData()
      .then(setMessages)
      .catch(err => {
        console.error(err);
        setMessages([]);
      });
  }, []);

  if (messages === null) {
    return <div style={{ textAlign:'center', padding:'2rem' }}>Loading…</div>;
  }

  return (
    <ChatWindow>
      {messages.length > 0 ? (
        messages.map((msg, i) => (
          <ChatMessage
            key={msg.id || i}
            author={msg.sender_username}
            text={msg.message}
            fromMe={msg.sender_username === '<your-username>'} // or however you detect “me”
          />
        ))
      ) : (
        <div style={{ textAlign:'center', marginTop:'2rem' }}>
          No messages yet.
        </div>
      )}
    </ChatWindow>
  );
}

export default App;
