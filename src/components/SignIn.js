// src/components/SignIn.js

import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../AuthContext';

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: 8px;
  width: 320px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  margin: 0 0 1rem;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.inputBg};
  color: ${({ theme }) => theme.colors.text};
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
`;

export default function SignIn({ onLogin }) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    setLoading(true);
    try {
      await login(username.trim());
      onLogin(username.trim());
    } catch (err) {
      console.error(err);
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <Title>Sign In</Title>
        <form onSubmit={submit}>
          <Input
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Signing In…' : 'Sign In'}
          </Button>
        </form>
      </Card>
    </Container>
  );
}
