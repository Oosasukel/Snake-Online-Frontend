import SVG from 'react-inlinesvg';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  padding: 4rem;
  height: 100%;
  display: grid;
  position: relative;
  overflow: hidden;
  grid-template-columns: 1fr 1.5fr;
  grid-template-rows: minmax(0, 1fr);
  gap: 4rem;
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
`;

export const SectionPlayer = styled.section`
  height: 100%;
  display: grid;
  grid-template-rows: 1fr minmax(0, 1fr);
  gap: 4rem;
  z-index: 1;
`;

export const PlayerInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    color: ${({ theme }) => theme.colors.textPrimary};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    font-size: 1.125rem;
    text-align: center;
    margin-bottom: 1rem;
  }
`;

export const SectionRooms = styled.section`
  display: grid;
  grid-template-rows: minmax(0, 1fr) min-content;
  gap: 0.5rem;
  z-index: 1;
`;

export const RoomsContainer = styled.div`
  display: grid;
  grid-template-rows: min-content minmax(0, 1fr);
`;

export const RoomsHeader = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr min-content;
  padding: 0.25rem 0.5rem;
  margin-bottom: 1rem;

  span {
    color: ${({ theme }) => theme.colors.textPrimary};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    font-size: 1.125rem;
    text-align: center;
  }
`;

export const RoomsList = styled.ul`
  list-style-type: none;
  overflow: auto;
`;

interface ListItemProps {
  disabled?: boolean;
}

export const ListItem = styled.li<ListItemProps>`
  display: grid;
  gap: 2rem;
  padding: 0.25rem 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  grid-template-columns: 1fr 4rem;

  ${({ theme, disabled }) => {
    if (disabled) {
      return css`
        &:hover {
          background-color: ${theme.colors.itemHoverDisabled};
        }

        span {
          color: ${theme.colors.textDisabled};

          &:last-child {
            text-align: right;
          }
        }
      `;
    } else {
      return css`
        &:hover {
          background-color: ${theme.colors.itemHover};
        }

        span {
          color: ${theme.colors.textPrimary};

          &:last-child {
            text-align: right;
          }
        }
      `;
    }
  }}

  &:last-child {
    margin-bottom: 0;
  }

  &:active {
    filter: brightness(1.2);
  }
`;

export const RoomsOptions = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr min-content;
  gap: 2rem;

  form {
    display: flex;

    button {
      background: none;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const SearchIcon = styled(SVG)`
  min-height: 1.5rem;
  min-width: 1.5rem;
  margin-left: 0.5rem;

  path {
    fill: ${({ theme }) => theme.colors.border};
  }

  &:hover {
    filter: brightness(1.1);
  }

  &:active {
    filter: brightness(1.2);
  }
`;
