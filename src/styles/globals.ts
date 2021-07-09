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
    font: 400 16px 'Lato', sans-serif;
  }

  html,
  body,
  body > div:first-child {
    height: 100vh;
    background: #1c1b20;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
