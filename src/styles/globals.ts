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
    cursor: pointer;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(1.1)
    }

    &:active {
      filter: brightness(1.2)
    }
  }

  /* scrollbar */

  /* width */
  ::-webkit-scrollbar {
    width: 0.25rem;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    /* box-shadow: inset 0 0 5px grey; 
    border-radius: 10px; */
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.scrollbar}; 
    border-radius: 1rem;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.scrollbar}; 
  }
`;
