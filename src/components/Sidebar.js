// src/components/Sidebar.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getOpenChats } from '../api';
import { useAuth } from '../AuthContext';

const Bar = styled.div`
  width: 250px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  padding: 16px;
  overflow-y: auto;
`;

const ChatItem = styled.div`
  padding: 8px;
  margin-bottom: 4px;
  border-radius: 4px;
  cursor: pointer;
  background: ${({ selected, theme }) =>
    selected ? theme.colors.primary : 'transparent'};
`;

export default function Sidebar({ selected, onSelect }) {
  const { token } = useAuth();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (!token) return;
    getOpenChats(token).then(setChats);
  }, [token]);

  return (
    <Bar>
      {chats.map((c) => (
        <ChatItem
          key={c}
          selected={c === selected}
          onClick={() => onSelect(c)}
        >
          {c}
        </ChatItem>
      ))}
    </Bar>
  );
}
