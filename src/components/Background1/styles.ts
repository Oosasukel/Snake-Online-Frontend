import styled from 'styled-components';

export const Container = styled.div`
  z-index: 0;
  position: absolute;
  top: 0;
  right: 0;
  transform: rotate(22deg) translateX(-14%) translateY(-24%);

  opacity: 0.07;
`;

export const Tail = styled.div`
  box-shadow: ${({ theme }) => theme.boxShadows.snakeBackgroundBody};
  height: 60vh;
  width: 60vh;
  border-radius: 15%;
  background-color: ${({ theme }) => theme.colors.snakeBody};

  margin-bottom: 6%;
`;

export const Head = styled.div`
  box-shadow: ${({ theme }) => theme.boxShadows.snakeBackgroundHead};
  height: 60vh;
  width: 60vh;
  border-radius: 15%;
  background-color: ${({ theme }) => theme.colors.primary};
`;
