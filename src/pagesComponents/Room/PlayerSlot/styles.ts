import SVG from 'react-inlinesvg';
import styled, { css } from 'styled-components';

interface ContainerProps {
  empty?: boolean;
  closed?: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;

  ${({ empty, closed }) => {
    if (empty) {
      return css`
        display: grid;
        justify-content: center;
        margin-top: 2.5rem;
        grid-template-rows: 1fr;
        grid-template-columns: minmax(0, 1fr);
      `;
    } else if (closed) {
      return css`
        display: flex;
        justify-content: center;
        align-items: center;
      `;
    } else {
      return css`
        display: grid;
        justify-content: center;
        grid-template-rows: min-content 1fr;
        grid-template-columns: minmax(0, 1fr);
      `;
    }
  }}
`;

export const PlayerName = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 1.125rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export const EmptyText = styled.span`
  z-index: 2;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1rem;
  text-align: center;

  &:hover {
    filter: brightness(1.1);
  }

  &:active {
    filter: brightness(1.2);
  }
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

export const CloseIcon = styled(SVG)`
  cursor: pointer;
  z-index: 1;
  position: absolute;
  right: 0;
  top: 0;
  margin-top: 2rem;
  margin-right: 1rem;
  min-height: 1.5rem;
  min-width: 1.5rem;

  path {
    fill: ${({ theme }) => theme.colors.danger};
  }
`;

export const CheckIcon = styled(SVG)`
  z-index: 1;
  position: absolute;
  right: 0;
  bottom: 0;
  margin-bottom: 1rem;
  margin-right: 1rem;
  min-height: 2rem;
  min-width: 2rem;

  path {
    fill: ${({ theme }) => theme.colors.success};
  }
`;

export const ClosedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 1rem;

    &:hover {
      filter: brightness(1.1);
    }

    &:active {
      filter: brightness(1.2);
    }
  }
`;

export const SlotClosedIcon = styled(SVG)`
  z-index: 1;
  min-height: 4.5rem;
  min-width: 4.5rem;
  opacity: 0.2;

  path {
    fill: ${({ theme }) => theme.colors.snakePlaceholder};
  }
`;

export const MessageBox = styled.div`
  z-index: 2;
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(0.8rem, -3rem);
  width: 6rem;
  height: 3.6rem;
  background-color: ${({ theme }) => theme.colors.balloonBackground};
  border-radius: 1rem;
  padding: 0.625rem;
`;

export const MessageTail = styled(SVG)`
  position: absolute;
  left: 0;
  bottom: 0;
  transform: translate(0.4rem, 1.2rem);
  z-index: 1;
  min-height: 2rem;
  min-width: 2rem;

  path {
    fill: ${({ theme }) => theme.colors.balloonBackground};
  }
`;

export const MessageText = styled.p`
  font-size: 0.625rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;
