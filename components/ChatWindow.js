import React from 'react';
import styled from 'styled-components';

const Window = styled.div`
  max-width: 600px;
  height: 80vh;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background: #e5ddd5;
  padding: 16px;
`;

export default function ChatWindow({ children }) {
  return <Window>{children}</Window>;
}
