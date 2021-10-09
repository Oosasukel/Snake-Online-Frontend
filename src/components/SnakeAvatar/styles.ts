import styled, { keyframes } from 'styled-components';

const SnakeMovement = keyframes`
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(1.5%);
    }
`;

export const Tail = styled.div`
  box-shadow: ${({ theme }) => theme.boxShadows.snakeBody};
  height: 100%;
  width: min-content;
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.snakeBody};
  border-radius: 17%;

  animation: ${SnakeMovement} 1.2s cubic-bezier(0.5, -50, 0.5, 50) infinite;
`;

export const EmptyBlock = styled.div`
  opacity: 0.2;
  box-shadow: ${({ theme }) => theme.boxShadows.snakePlaceholder};
  height: 100%;
  width: min-content;
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.snakePlaceholder};
  border-radius: 17%;

  animation: ${SnakeMovement} 1.2s cubic-bezier(0.5, -50, 0.5, 50) infinite;
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
    animation-delay: 0.2s;
  }

  ${Tail}:nth-child(2) {
    animation-delay: 0.1s;
  }

  ${EmptyBlock}:nth-child(1) {
    animation-delay: 0.2s;
  }

  ${EmptyBlock}:nth-child(2) {
    animation-delay: 0.1s;
  }
`;

export const Head = styled.div`
  box-shadow: ${({ theme }) => theme.boxShadows.snakeAvatarHead};
  height: 100%;
  width: min-content;
  display: inline-block;
  border-radius: 17%;
  background-color: ${({ theme }) => theme.colors.primary};

  animation: ${SnakeMovement} 1.2s cubic-bezier(0.5, -50, 0.5, 50) infinite;
`;
