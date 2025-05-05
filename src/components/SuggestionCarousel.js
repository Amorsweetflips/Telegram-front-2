// src/components/SuggestionCarousel.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { suggestReplies } from '../api';
import { useAuth } from '../AuthContext';

const Container = styled.div`
  display: flex;
  padding: 8px;
  background: ${({ theme }) => theme.colors.surface};
  overflow-x: auto;
`;

const Chip = styled.div`
  background: ${({ theme }) => theme.colors.suggestionBg};
  color: ${({ theme }) => theme.colors.text};
  padding: 6px 12px;
  margin-right: 8px;
  border-radius: 16px;
  cursor: pointer;
`;

export default function SuggestionCarousel({ chatName, lastMessage, onChoose }) {
  const { token } = useAuth();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (lastMessage && token) {
      suggestReplies(chatName, lastMessage, token).then(setOptions);
    }
  }, [lastMessage, chatName, token]);

  return (
    <Container>
      {options.map((opt, i) => (
        <Chip key={i} onClick={() => onChoose(opt)}>
          {opt}
        </Chip>
      ))}
    </Container>
  );
}
