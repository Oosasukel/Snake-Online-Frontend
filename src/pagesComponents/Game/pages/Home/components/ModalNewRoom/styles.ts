import { Form as UnformForm } from '@unform/web';
import styled from 'styled-components';

export const Form = styled(UnformForm)`
  width: 17rem;
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
