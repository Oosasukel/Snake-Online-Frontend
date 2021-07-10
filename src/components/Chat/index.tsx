import Input from 'components/Input';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import * as S from './styles';

const MAX_MESSAGES = 50;

interface Message {
  sender: string;
  time: string;
  text: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesContainerRef = useRef<HTMLDivElement>();
  const inputRef = useRef<HTMLInputElement>();

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

  const addMessage = useCallback(
    (message: Message) => {
      const scrollWasBottom = scrollIsBottom();

      setMessages((previous) => {
        if (previous.length >= MAX_MESSAGES) {
          const numberOfMessagesToDelete = previous.length - MAX_MESSAGES + 1;

          const messagesUpdated = [...previous, message];
          messagesUpdated.splice(0, numberOfMessagesToDelete);

          return messagesUpdated;
        } else {
          return [...previous, message];
        }
      });

      if (scrollWasBottom) {
        setTimeout(scrollToBottom, 0);
      }
    },
    [scrollIsBottom, scrollToBottom]
  );

  const submitMessage = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const text = inputRef.current.value;
      if (!text) return;

      const currentDate = new Date();
      const hour = currentDate.getHours().toString().padStart(2, '0');
      const minutes = currentDate.getMinutes().toString().padStart(2, '0');

      inputRef.current.value = '';

      addMessage({
        sender: 'Oosasukel',
        time: `${hour}:${minutes}`,
        text,
      });
    },
    [addMessage]
  );

  useEffect(() => {
    setInterval(() => {
      const currentDate = new Date();
      const hour = currentDate.getHours().toString().padStart(2, '0');
      const minutes = currentDate.getMinutes().toString().padStart(2, '0');

      addMessage({
        sender: 'Usuário aleatório',
        time: `${hour}:${minutes}`,
        text:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      });
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.Container>
      <S.MessagesContainer ref={messagesContainerRef}>
        {messages.map((message, index) => (
          <S.Message key={index}>
            <S.MessageHeader>
              <S.Sender>{message.sender}</S.Sender>
              <S.Time>{message.time}</S.Time>
            </S.MessageHeader>
            <S.MessageText>{message.text}</S.MessageText>
          </S.Message>
        ))}
      </S.MessagesContainer>
      <S.SendMessageForm onSubmit={submitMessage}>
        <Input ref={inputRef} placeholder="New Message..." />
        <button type="submit">
          <S.SendMessageIcon src="/icons/send-message.svg" />
        </button>
      </S.SendMessageForm>
    </S.Container>
  );
};

export default Chat;
