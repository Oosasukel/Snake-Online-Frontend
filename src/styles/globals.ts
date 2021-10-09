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

  html {
    @media (min-width: 640px) and (min-height: 360px){
      font-size: 9px;
    }
    @media (min-width: 640px) and (min-height: 480px){
      font-size: 11px;
    }
    @media (min-width: 960px) and (min-height: 540px){
      font-size: 12px;
    }
    @media (min-width: 1024px) and (min-height: 768px){
      font-size: 16px;
    }
    @media (min-width: 1600px) and (min-height: 900px){
      font-size: 20px;
    }
    @media (min-width: 1920px) and (min-height: 1080px){
      font-size: 24px;
    }
    @media (min-width: 2560px) and (min-height: 1440px){
      font-size: 26px;
    }
    @media (min-width: 3200px) and (min-height: 1800px){
      font-size: 30px;
    }
    @media (min-width: 3840px) and (min-height: 2160px){
      font-size: 36px;
    }
    @media (min-width: 5120px) and (min-height: 2880px){
      font-size: 54px;
    }
    @media (min-width: 7680px) and (min-height: 4320px){
      font-size: 82px;
    }
  }
`;
