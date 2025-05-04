import React from 'react';
import styled from 'styled-components';

const Bubble = styled.div`
  max-width: 70%;
  padding: 8px 12px;
  margin: 6px 0;
  border-radius: 8px;
  background: ${({ fromMe }) => (fromMe ? '#dcf8c6' : '#fff')};
  align-self: ${({ fromMe }) => (fromMe ? 'flex-end' : 'flex-start')};
  box-shadow: 0 1px 1px rgba(0,0,0,0.1);
`;

const Author = styled.div`
  font-size: 0.75rem;
  color: #555;
  margin-bottom: 4px;
`;

export default function ChatMessage({ author, text, fromMe = false }) {
  return (
    <Bubble fromMe={fromMe}>
      {!fromMe && <Author>@{author}</Author>}
      <div>{text}</div>
    </Bubble>
  );
}
