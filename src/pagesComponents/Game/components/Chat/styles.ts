import { Form } from '@unform/web';
import SVG from 'react-inlinesvg';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  z-index: 1;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;

  display: grid;
  grid-template-rows: 1fr min-content;
  gap: 0.5rem;
`;

export const Message = styled.div``;

export const MessagesContainer = styled.div`
  overflow: auto;

  ${Message} {
    margin-bottom: 0.5rem;
  }

  ${Message}:last-child {
    margin-bottom: 0;
  }
`;

export const MessageHeader = styled.div`
  display: flex;
`;

interface SenderProps {
  itIsMe?: boolean;
}

export const Sender = styled.span<SenderProps>`
  color: ${({ theme, itIsMe }) =>
    itIsMe ? theme.colors.primary : theme.colors.textPrimary};
  font-size: 1.125rem;
  flex: 1;
`;

export const Time = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  margin-right: 0.5rem;
`;

export const MessageText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  margin-right: 0.5rem;
`;

export const SendMessageForm = styled(Form)`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr min-content;
  gap: 0.5rem;

  width: 100%;

  button {
    background: none;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const SendMessageIcon = styled(SVG)`
  min-height: 1.5rem;
  min-width: 1.5rem;
  height: 1.5rem;
  width: 1.5rem;

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
