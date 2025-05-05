// src/components/ChatWindow.js
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Window = styled.div`
  flex: 1;
  padding: 16px;
  background: ${({ theme }) => theme.colors.background};
  overflow-y: auto;
`;

export default function ChatWindow({ messages }) {
  const endRef = useRef();
  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);
  return (
    <Window>
      {messages.map((m) => (
        <div key={m.id}>{m.sender_username}: {m.message}</div>
      ))}
      <div ref={endRef} />
    </Window>
  );
}
