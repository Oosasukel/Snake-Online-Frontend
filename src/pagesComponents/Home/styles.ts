import styled from 'styled-components';

export const Container = styled.div`
  padding: 4rem;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.colors.textPrimary};
`;
