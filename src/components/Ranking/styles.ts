import styled, { css } from 'styled-components';

interface UserProps {
  active?: boolean;
}

export const User = styled.div<UserProps>`
  display: grid;
  grid-template-columns: minmax(2rem, min-content) 1fr minmax(2rem, min-content);
  gap: 1rem;

  span {
    font-size: 1.125rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span:nth-child(1) {
    ${({ theme, active }) => {
      if (active) {
        return css`
          color: ${theme.colors.warn};
        `;
      } else {
        return css`
          color: ${theme.colors.textPrimary};
        `;
      }
    }}
  }

  span:nth-child(2) {
    font-weight: ${({ theme }) => theme.fontWeights.bold};

    ${({ theme, active }) => {
      if (active) {
        return css`
          color: ${theme.colors.warn};
        `;
      } else {
        return css`
          color: ${theme.colors.textPrimary};
        `;
      }
    }}
  }

  span:nth-child(3) {
    text-align: right;

    ${({ theme, active }) => {
      if (active) {
        return css`
          color: ${theme.colors.warn};
        `;
      } else {
        return css`
          color: ${theme.colors.textSecondary};
        `;
      }
    }}
  }
`;

export const Container = styled.div`
  overflow: auto;
  z-index: 1;
  padding: 1rem;
  width: 100%;
  height: 100%;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;

  ${User} {
    margin-bottom: 0.5rem;
  }

  ${User}:last-child {
    margin-bottom: 0;
  }
`;
