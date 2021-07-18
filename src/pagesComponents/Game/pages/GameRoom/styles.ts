import SVG from 'react-inlinesvg';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 4rem;
  height: 100%;
  display: grid;
  position: relative;
  grid-template-areas:
    'header   header  header'
    'chat     game    ranking';
  overflow: hidden;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: min-content minmax(0, 1fr);
  gap: 1rem;
`;

export const ReturnIcon = styled(SVG)`
  position: absolute;
  cursor: pointer;
  top: 4rem;
  left: 4rem;
  min-width: 2rem;
  min-height: 2rem;
  z-index: 2;

  path {
    fill: ${({ theme }) => theme.colors.danger};
  }

  &:hover {
    filter: brightness(1.1);
  }

  &:active {
    filter: brightness(1.2);
  }
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 1.5rem;
  margin-left: 3rem;
  grid-area: header;
  z-index: 1;
`;

export const SectionGame = styled.section`
  background-color: blueviolet;
  grid-area: game;
  z-index: 1;
`;

export const SectionRanking = styled.section`
  z-index: 1;
  grid-area: ranking;
  display: grid;
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 1rem;
`;