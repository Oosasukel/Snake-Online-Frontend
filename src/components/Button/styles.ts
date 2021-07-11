import styled, { css } from 'styled-components';

interface CustomButtonProps {
  variant: 'primary' | 'secondary';
}

export const CustomButton = styled.button<CustomButtonProps>`
  padding: 0.75rem 1rem;
  border: 1px solid transparent;
  border-radius: 0.75rem;
  width: 100%;
  display: flex;
  justify-content: center;
  white-space: nowrap;

  ${({ theme, variant }) => {
    if (variant === 'secondary') {
      return css`
        color: ${theme.colors.buttonPrimaryText};
        font-weight: ${theme.fontWeights.bold};
        background-color: transparent;
        transition: background-color 0.2s;

        &:active {
          background-color: ${theme.colors.buttonSecondaryActive};
        }
      `;
    }

    return css`
      background-color: ${theme.colors.buttonPrimaryBackground};
      color: ${theme.colors.buttonPrimaryText};
      font-weight: ${theme.fontWeights.bold};
      transition: border 0.2s, filter 0.2s;

      &:hover {
        border: 1px solid ${theme.colors.border};
      }

      &:active {
        filter: brightness(1.2);
      }
    `;
  }}
`;
