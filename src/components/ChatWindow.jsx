import React, { useEffect, useState } from 'react';
import api from '../api';

export default function ChatWindow({ chatName }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    api.get(`/chats/${chatName}/messages`).then(r => setMessages(r.data.messages));
  }, [chatName]);

  const send = async () => {
    await api.post('/send', { chat_name: chatName, message: input });
    setMessages(m => [...m, { sender_username: 'you', message: input }]);
    setInput('');
  };

  const fetchAI = async () => {
    const res = await api.post('/suggest', null, {
      params: { chat_name: chatName, last_message: input }
    });
    setSuggestions(res.data.options);
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((m, i) => <div key={i}>{m.sender_username}: {m.message}</div>)}
      </div>
      <div className="suggestions">
        {suggestions.map((opt, i) => <button key={i} onClick={() => setInput(opt)}>{opt}</button>)}
      </div>
      <div className="bottom-bar">
        <input value={input} onChange={e => setInput(e.target.value)} />
        <button onClick={fetchAI}>🤖</button>
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}
