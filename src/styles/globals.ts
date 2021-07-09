import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body,
  input,
  button,
  textarea {
    font: ${({ theme }) => theme.fontWeights.normal} 16px 'Nunito', sans-serif;
  }

  html,
  body,
  body > div:first-child {
    height: 100vh;
    background: ${({ theme }) => theme.colors.background};
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
