import styled, { css } from 'styled-components';

export const Title = styled.h1`
  text-align: center;
  width: 100%;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.warn};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 1.125rem;
`;

export const RankingList = styled.div`
  display: flex;
  flex-direction: column;
  width: 22rem;

  & *:last-child {
    margin-bottom: 0;
  }
`;

export const Nickname = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 1rem;
`;

export const Apples = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 1rem;
  text-align: right;
`;

export const Position = styled.span`
  color: ${({ theme }) => theme.colors.warn};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 1rem;
  text-align: right;
`;

interface ItemProps {
  active: boolean;
}

export const Item = styled.div<ItemProps>`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 6rem 2rem;
  grid-gap: 1rem;
  padding: 0.5rem;
  margin-bottom: 0.125rem;
  border-radius: 0.5rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.itemHover};
  }

  ${({ active, theme }) => {
    if (active) {
      return css`
        ${Nickname} {
          color: ${theme.colors.primary};
          font-size: 1.5rem;
        }
      `;
    }
  }}
`;
