// src/components/ChatInput.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { sendReply } from '../api';
import { useAuth } from '../AuthContext';

const Form = styled.form`
  display: flex;
  padding: 8px;
  background: ${({ theme }) => theme.colors.surface};
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  background: ${({ theme }) => theme.colors.inputBg};
  border: none;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.text};
`;

const Button = styled.button`
  margin-left: 8px;
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
`;

export default function ChatInput({ chatName, onSent }) {
  const { token } = useAuth();
  const [text, setText] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await sendReply(chatName, text, token);
    onSent(text);
    setText('');
  };

  return (
    <Form onSubmit={submit}>
      <Input 
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
      />
      <Button type="submit">Send</Button>
    </Form>
  );
}
