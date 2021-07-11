import SVG from 'react-inlinesvg';
import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: min-content 1fr;
`;

export const PlayerName = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 1.125rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export const OwnerIcon = styled(SVG)`
  z-index: 1;
  position: absolute;
  left: 0;
  top: 0;
  margin-top: 2rem;
  margin-left: 1rem;
  min-height: 2rem;
  min-width: 2rem;

  path {
    fill: ${({ theme }) => theme.colors.warn};
  }
`;
