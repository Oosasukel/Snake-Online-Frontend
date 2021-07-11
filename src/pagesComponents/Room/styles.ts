import SVG from 'react-inlinesvg';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 4rem;
  height: 100%;
  display: grid;
  position: relative;
  overflow: hidden;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: minmax(0, 1fr);
  gap: 4rem;
`;

export const SectionChat = styled.section`
  display: grid;
  grid-template-rows: min-content minmax(0, 1fr);
  gap: 1rem;
`;

export const TitleContainer = styled.div`
  display: flex;

  h1 {
    color: ${({ theme }) => theme.colors.textPrimary};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    font-size: 1.5rem;
  }
`;

export const ReturnIcon = styled(SVG)`
  margin-right: 1rem;
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

export const SectionRoom = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1fr) min-content;
  gap: 4rem;
  z-index: 1;
`;

export const PlayersContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(4, 1fr);
  height: 100%;
  gap: 2rem 0.5rem;
`;

export const ConfigContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
