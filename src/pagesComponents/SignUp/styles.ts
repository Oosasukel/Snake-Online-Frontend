import { Form as UnformForm } from '@unform/web';
import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
`;

export const Form = styled(UnformForm)`
  display: flex;
  flex-direction: column;
  width: 17rem;
`;

export const Error = styled.span`
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  width: 100%;
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: 2rem;
`;

export const FooterText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  font-size: 1rem;

  a {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
`;
