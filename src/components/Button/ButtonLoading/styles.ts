import styled, { keyframes } from 'styled-components';

const ringAnimation = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`;

export const Ring = styled.div`
  display: inline-block;
  position: relative;
  width: 1.375rem;
  height: 1.375rem;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    border-color: ${({ theme }) => theme.colors.buttonPrimaryText} transparent
      transparent transparent;
  }

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 1.375rem;
    height: 1.375rem;
    border-width: 0.25rem;
    border-style: solid;
    border-radius: 50%;
    animation: ${ringAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  }

  div:nth-child(1) {
    animation-delay: -0.45s;
  }

  div:nth-child(2) {
    animation-delay: -0.3s;
  }

  div:nth-child(3) {
    animation-delay: -0.15s;
  }
`;
