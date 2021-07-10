import styled from 'styled-components';

export const CustomInput = styled.input`
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textPrimary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  outline: none;
  transition: border 0.2s;
  width: 100%;

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.textPrimary};
  }
`;
