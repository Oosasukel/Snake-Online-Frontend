import styled, { css } from 'styled-components';

interface ContainerProps {
  open: boolean;
}

export const Container = styled.div<ContainerProps>`
  height: 100vh;
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  background-color: ${({ theme }) => theme.colors.background};

  transition: visibility 0s, opacity 0.2s linear;

  ${({ open }) => {
    if (open) {
      return css`
        visibility: visible;
        opacity: 1;
      `;
    } else {
      return css`
        visibility: hidden;
        opacity: 0;
      `;
    }
  }}

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1.125rem;
  text-align: center;
  margin-bottom: 0.5rem;
  width: 17rem;
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  text-align: center;
  width: 17rem;
`;
