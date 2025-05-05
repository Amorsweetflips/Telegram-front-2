// src/theme.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
  * { box-sizing: border-box; }
`;

export const theme = {
  colors: {
    primary: '#FF4081',      // SweetFlips pink
    background: '#1C1E21',   // Dark dashboard bg
    surface: '#2C2F33',      // Panels
    text: '#FFFFFF',         // Text
    muted: '#B0B3B8',        // Secondary text
    accent: '#7289DA',       // Buttons
    inputBg: '#40444B',      // Input fields
    suggestionBg: '#4F545C'  // Suggestion chips
  }
};
