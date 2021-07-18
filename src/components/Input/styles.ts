import styled from 'styled-components';

interface ContainerProps {
  error?: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;

  span {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.error};
  }

  input {
    padding: 0.5rem 1rem;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.textPrimary};
    border: 1px solid
      ${({ theme, error }) =>
        error ? theme.colors.error : theme.colors.border};
    border-radius: 0.5rem;
    font-size: 1rem;
    outline: none;
    transition: border 0.2s;
    width: 100%;

    &:focus {
      border: 1px solid
        ${({ theme, error }) =>
          error ? theme.colors.error : theme.colors.textPrimary};
    }

    /* background color - autocomplete */
    &:-webkit-autofill {
      box-shadow: 0 0 0 2rem ${({ theme }) => theme.colors.background} inset;
    }

    /* text color - autocomplete */
    &:-webkit-autofill {
      -webkit-text-fill-color: ${({ theme }) => theme.colors.textPrimary};
    }
  }
`;
