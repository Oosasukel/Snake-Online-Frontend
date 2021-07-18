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

export const LogoContainer = styled.div`
  position: relative;
  height: 4rem;
  margin-bottom: 4rem;
`;

export const Light = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  width: 1rem;
  height: 1rem;
  background: ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.boxShadows.backgroundLight};
  filter: blur(4rem);
`;

export const Logo = styled.img`
  height: 4rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const Form = styled(UnformForm)`
  display: flex;
  flex-direction: column;
  width: 17rem;
`;

export const ForgotPasswordText = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: right;
  margin-bottom: 1.375rem;
  width: min-content;
  white-space: nowrap;
  align-self: flex-end;
  font-size: 1rem;
`;

export const Error = styled.span`
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  width: 100%;
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: 1rem;
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
