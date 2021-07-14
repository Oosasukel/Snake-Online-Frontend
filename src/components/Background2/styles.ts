import styled from 'styled-components';

export const Container = styled.div`
  z-index: 0;
  position: absolute;
  display: grid;
  grid-template-columns: auto auto;
  top: 0;
  left: 0;
  transform: rotate(22deg) translateX(-59%) translateY(-2%);

  opacity: 0.07;
`;

export const Tail = styled.div`
  box-shadow: ${({ theme }) => theme.boxShadows.snakeBackgroundBody};
  height: 60vh;
  width: 60vh;
  border-radius: 15%;
  background-color: ${({ theme }) => theme.colors.snakeBody};

  margin-bottom: 6%;
  margin-right: 6%;
`;

export const Apple = styled.div`
  box-shadow: ${({ theme }) => theme.boxShadows.snakeBackgroundApple};
  height: 60vh;
  width: 60vh;
  border-radius: 15%;
  background-color: ${({ theme }) => theme.colors.danger};
  grid-column: 2;
`;
