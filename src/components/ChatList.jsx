import React, { useEffect, useState } from 'react';
import api from '../api';
import ChatItem from './ChatItem';

export default function ChatList() {
  const [chats, setChats] = useState([]);
  useEffect(() => {
    api.get('/chats/open').then(res => setChats(res.data.chats));
  }, []);
  return (
    <div className="chat-list">
      {chats.map(c => <ChatItem key={c} name={c} />)}
    </div>
  );
}
