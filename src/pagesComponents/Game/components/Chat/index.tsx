import { SubmitHandler } from '@unform/core';
import Input from 'components/Input';
import { GameContext } from 'pagesComponents/Game/context/GameContext';
import { Message } from 'pagesComponents/Game/context/types';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import * as S from './styles';

const MAX_MESSAGES = 50;

interface ChatMessage {
  sender: string;
  time: string;
  text: string;
}

interface SubmitMessage {
  message: string;
}

interface ChatProps {
  onMessage?: (message: ChatMessage) => void;
}

const Chat = ({ onMessage }: ChatProps) => {
  const { messageEmit, onNewMessage, user } = useContext(GameContext);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesContainerRef = useRef<HTMLDivElement>();

  const scrollToBottom = useCallback(() => {
    const scrollHeight = messagesContainerRef.current.scrollHeight;
    messagesContainerRef.current.scrollTo(0, scrollHeight);
  }, []);

  const scrollIsBottom = useCallback(() => {
    const scrollHeight = messagesContainerRef.current.scrollHeight;
    const currentScroll =
      messagesContainerRef.current.scrollTop +
      messagesContainerRef.current.offsetHeight;
    const offsetToConsiderBottom = scrollHeight - 20;

    return currentScroll >= offsetToConsiderBottom;
  }, []);

  const currentTime = useCallback(() => {
    const currentDate = new Date();
    const hour = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const timeFormatted = `${hour}:${minutes}`;

    return timeFormatted;
  }, []);

  const addMessage = useCallback(
    (message: Message) => {
      const scrollWasBottom = scrollIsBottom();

      const messageToAdd: ChatMessage = {
        time: currentTime(),
        text: message.text,
        sender: message.sender,
      };

      const mergeMessages = (previous: ChatMessage[], last: ChatMessage) => {
        if (previous.length === 0) {
          return [last];
        }

        const messagesUpdated = [...previous];

        if (messagesUpdated[previous.length - 1].sender === last.sender) {
          messagesUpdated[previous.length - 1].text += `\n${last.text}`;
        } else {
          messagesUpdated.push(last);
        }

        return messagesUpdated;
      };

      setMessages((previous) => {
        if (previous.length >= MAX_MESSAGES) {
          const numberOfMessagesToDelete = previous.length - MAX_MESSAGES + 1;

          const messagesUpdated = mergeMessages(previous, messageToAdd);

          messagesUpdated.splice(0, numberOfMessagesToDelete);

          return messagesUpdated;
        } else {
          return mergeMessages(previous, messageToAdd);
        }
      });

      if (onMessage) {
        onMessage(messageToAdd);
      }

      if (scrollWasBottom) {
        setTimeout(scrollToBottom, 0);
      }
    },
    [currentTime, onMessage, scrollIsBottom, scrollToBottom]
  );

  const submitMessage: SubmitHandler<SubmitMessage> = useCallback(
    ({ message }, { reset }) => {
      if (!message) return;

      addMessage({
        sender: user.nickname,
        text: message,
      });

      messageEmit(message);

      reset();
    },
    [addMessage, messageEmit, user]
  );

  useEffect(() => {
    onNewMessage(addMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.Container>
      <S.MessagesContainer ref={messagesContainerRef}>
        {messages.map((message, index) => (
          <S.Message key={index}>
            <S.MessageHeader>
              <S.Sender itIsMe={message.sender === user.nickname}>
                {message.sender}
              </S.Sender>
              <S.Time>{message.time}</S.Time>
            </S.MessageHeader>
            {message.text.split('\n').map((text, index) => (
              <S.MessageText key={index}>{text}</S.MessageText>
            ))}
          </S.Message>
        ))}
      </S.MessagesContainer>
      <S.SendMessageForm onSubmit={submitMessage}>
        <Input name="message" placeholder="New Message..." />
        <button type="submit">
          <S.SendMessageIcon src="/icons/send-message.svg" />
        </button>
      </S.SendMessageForm>
    </S.Container>
  );
};

export default Chat;
