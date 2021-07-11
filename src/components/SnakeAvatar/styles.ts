import styled, { keyframes } from 'styled-components';

const SnakeMovement = keyframes`
    0% {
        transform: translateX(0);
    }
    25% {
        transform: translateX(-12%);
    }
    75% {
        transform: translateX(12%);
    }
    100% {
        transform: translateX(0);
    }
`;

export const Tail = styled.div`
  height: 100%;
  width: min-content;
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.snakeBody};
  border-radius: 17%;

  animation: ${SnakeMovement} 1s linear infinite;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.6%;
  height: 100%;
  width: 100%;

  ${Tail}:nth-child(1) {
    animation-delay: 0.4s;
  }

  ${Tail}:nth-child(2) {
    animation-delay: 0.2s;
  }
`;

export const Head = styled.div`
  height: 100%;
  width: min-content;
  display: inline-block;
  border-radius: 17%;
  background-color: ${({ theme }) => theme.colors.primary};

  animation: ${SnakeMovement} 1s linear infinite;
`;
