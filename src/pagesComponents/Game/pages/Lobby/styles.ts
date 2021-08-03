import { Form } from '@unform/web';
import SVG from 'react-inlinesvg';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 4rem;
  height: 100%;
  display: grid;
  position: relative;
  overflow: hidden;
  grid-template-columns: 1.5fr 4fr;
  grid-template-rows: minmax(0, 1fr);
  gap: 2rem;
`;

export const Ping = styled.span`
  position: absolute;
  left: 4rem;
  top: 1.5rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 1rem;
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
  gap: 2rem;
  z-index: 1;
`;

export const PlayersContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(3, minmax(0, 1fr));
  grid-template-columns: repeat(4, minmax(0, 1fr));
  height: 100%;
  gap: 2rem 0.5rem;
`;

export const ConfigContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Config = styled(Form)`
  display: flex;
  align-items: center;
  flex-direction: column;

  & > span {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  input {
    width: 3.8rem;
  }
`;

export const ReadyText = styled.p`
  margin-top: 10rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 1.125rem;
  white-space: nowrap;
  text-align: center;
  margin-bottom: 1rem;
`;
