import React, { useEffect, useRef } from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';
import { MessageBot } from './message/index';
import { Answer } from './answer/index';
import { ChatBotLayout } from '../../layout/chatbot/index';
import styled from 'styled-components';
import { useTheme } from 'styled-components';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { startChat } from '../../redux/chatBotSlice';
import { InputType } from './input';

const ChatFrame = styled.div`
  background: ${(props) => props.theme?.containerBackground};
`;

const Footer = styled.div`
  background-color: ${(props) => props.theme?.inputContainerBackground};
`;

export const ChatBot = () => {
  const theme = useTheme();
  const listMainQandA = useSelector((state) => state.message.listMainQandA);
  // const isLoadding = useSelector((state) => state.message.isLoadding);
  // const currentQandA = useSelector((state) => state.message.currentQandA);
  // const [form, setForm] = useState({ value: '' });
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // let urlSeach = window.location.search.substring(1).split('&');

  const inforUrl = {
    tenantId: '62554f74c5f9ba001d93fc31',
    pageUrl: 'localhost:3500',
  };

  useEffect(() => {
    scrollToBottom();
  }, [listMainQandA.length]);

  useEffect(() => {
    dispatch(startChat(inforUrl));
  }, []);

  const handleRenderListMainQandA = () => {
    return (
      <ChatFrame className={styles.body}>
        <MessageBot
          // key={index}
          type={'scenario'}
          messageBot={'グエンホアンサン'}
          handleChooseOptions={true}
          active={true}
        />
        <Answer answer={'グエンホアンサン'} />

        <div ref={messagesEndRef} />
      </ChatFrame>
    );
  };

  return (
    <ChatBotLayout>
      {handleRenderListMainQandA()}
      <Footer
        inputContainerBackground={theme.inputContainerBackground}
        className={clsx(styles.footer)}
      >
        <InputType type={'datepicker'} />
      </Footer>
    </ChatBotLayout>
  );
};
