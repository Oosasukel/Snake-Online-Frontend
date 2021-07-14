import styled from 'styled-components';

export const Overlay = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.form`
  width: 17rem;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 1rem;
  border-radius: 0.75rem;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 1.125rem;
`;

export const Buttons = styled.div`
  display: grid;
  gap: 1rem;
  width: 100%;
  grid-template-columns: repeat(2, minmax(0, 1fr));
`;
