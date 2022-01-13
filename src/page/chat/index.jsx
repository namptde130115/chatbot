import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';
import botImg from '../../assets/img/bot-header.png';
import { Message } from './message/index';
import { Answer } from './answer/index';
import { AnswerChat } from '../chat/answer-chat/index';
import { ChatBotLayout } from '../../layout/chatbot/index';
import styled from 'styled-components';

//redux
import { useSelector, useDispatch } from 'react-redux';
import {
  chooseAnswer,
  chooseCategory,
  chooseOptions,
  chooseYesNoDispatch,
  getMessage,
  questionMain,
  startChat,
} from '../../redux/messageSlice';
import { IsQA } from './isQA';

const ChatFrame = styled.div`
  background: ${(props) => props.theme.chatFrame?.background};
`;

const Input = styled.div`
  background: ${(props) => props.theme.input?.background};
`;

export const ChatBot = () => {
  const listMainQandA = useSelector((state) => state.message.listMainQandA);
  const isLoadding = useSelector((state) => state.message.isLoadding);
  const currentQandA = useSelector((state) => state.message.currentQandA);
  const [form, setForm] = useState({ value: '' });
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  let urlSeach = window.location.search.substring(1).split('&');

  const inforUrl = {
    tenantId: urlSeach[0].split('=')[1] || '63357bbdc04ce1afe94b063dd7670970',
    categories: urlSeach[1]?.split('=')[1] || '',
  };

  useEffect(() => {
    scrollToBottom();
  }, [listMainQandA.length]);

  useEffect(() => {
    dispatch(
      startChat({
        categories: inforUrl.categories,
        clientType: 'WIDGET',
        referrerUrl: `https://localhost:8443/draft/${inforUrl.tenantId}`,
        tenantId: inforUrl.tenantId,
        uid: '',
      })
    );
  }, []);

  const handleChooseAnswer = async (message, index) => {
    console.log('message from choose answer:', message, index);
    await dispatch(questionMain(message));
    await dispatch(
      chooseAnswer({
        chatId: currentQandA?.chatId,
        clientType: 'WIDGET',
        content: {
          inputText: '',
          options: [message],
          question: '###SUGGEST###',
          response: 0,
          questionMessageId: '',
        },
        referrerUrl:
          'https://localhost:8443/draft/63357bbdc04ce1afe94b063dd7670970',
        tenantId: '63357bbdc04ce1afe94b063dd7670970',
        uid: '',
      })
    );
  };

  const chooseOption = async (message, index) => {
    console.log('message from choose option:', message, index);
    console.log('currentQandA: ', currentQandA);

    await dispatch(questionMain(message));
    let contentSend = {
      ...currentQandA.contents[0],
      response: index,
    };
    delete contentSend.navigateOptions;
    console.log('contentSend: ', contentSend);
    await dispatch(
      chooseCategory({
        chatId: currentQandA?.chatId,
        clientType: 'WIDGET',
        content: {
          ...contentSend,
          response: index,
        },
        referrerUrl:
          'https://localhost:8443/draft/63357bbdc04ce1afe94b063dd7670970',
        tenantId: '63357bbdc04ce1afe94b063dd7670970',
        uid: '',
      })
    );
  };

  const chooseOpt = async (message, index) => {
    console.log('choose opt: ', message, index);
    await dispatch(questionMain(message.value));
    let sendContent = { ...currentQandA.contents[0] };
    delete sendContent.navigateOptions;
    await dispatch(
      chooseOptions({
        chatId: currentQandA.chatId,
        clientType: 'WIDGET',
        content: {
          ...sendContent,
          response: index,
        },
        referrerUrl:
          'https://localhost:8443/draft/63357bbdc04ce1afe94b063dd7670970',
        tenantId: '63357bbdc04ce1afe94b063dd7670970',
        uid: '',
      })
    );
  };

  const chooseQA = async (message, index) => {
    console.log('hanleChooseQA', message, index);
    await dispatch(questionMain(message));
    await dispatch(
      getMessage({
        chatId: currentQandA?.chatId,
        clientType: 'WIDGET',
        content: {
          ...currentQandA.contents[1],
          response: index,
        },
        referrerUrl:
          'https://localhost:8443/draft/63357bbdc04ce1afe94b063dd7670970',
        tenantId: '63357bbdc04ce1afe94b063dd7670970',
        uid: '',
      })
    );
  };

  const chooseYesNo = async (message, index) => {
    console.log('chooseYesNo', message, index);
    await dispatch(questionMain(message));
    await dispatch(
      chooseYesNoDispatch({
        chatId: currentQandA.chatId,
        clientType: 'WIDGET',
        content: {
          ...currentQandA.contents[0],
          response: index,
        },
        referrerUrl:
          'https://localhost:8443/draft/63357bbdc04ce1afe94b063dd7670970',
        tenantId: '63357bbdc04ce1afe94b063dd7670970',
        uid: '',
      })
    );
  };

  const breadCrumb = async (message, index, active) => {
    if (!active) {
      return;
    }
    let totalBreadCrumb =
      listMainQandA[listMainQandA?.length - 1].breadCrumbs.length;
    console.log('message from breadCrumb:', message, index);
    console.log('totalBreadCrumb:', totalBreadCrumb);
    let messageBack = '';
    for (let i = 0; i < totalBreadCrumb - 1 - index; i++) {
      messageBack += '<';
    }

    console.log('messageBack: ', messageBack);

    await dispatch(questionMain(messageBack));
    await dispatch(
      getMessage({
        chatId: currentQandA?.chatId,
        clientType: 'WIDGET',
        content: {
          text: messageBack,
        },
        referrerUrl:
          'https://localhost:8443/draft/63357bbdc04ce1afe94b063dd7670970',
        tenantId: '63357bbdc04ce1afe94b063dd7670970',
        uid: '',
      })
    );
  };

  const handleChange = (e) => {
    setForm({ value: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('trim', form.value.trim());
    if (form.value.trim() === '') {
      setForm({ value: '' });
      return;
    }
    await dispatch(questionMain(form.value));
    await dispatch(
      getMessage({
        chatId: currentQandA?.chatId,
        clientType: 'WIDGET',
        content: {
          text: form.value,
        },
        referrerUrl:
          'https://localhost:8443/draft/63357bbdc04ce1afe94b063dd7670970',
        tenantId: '63357bbdc04ce1afe94b063dd7670970',
        uid: '',
      })
    );
    setForm({ value: '' });
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleRenderListMainQandA = () => {
    return (
      <ChatFrame className={styles.body}>
        {listMainQandA.map((element, index) => {
          return element.type === 'question' ? (
            <AnswerChat
              key={index}
              title={element.title}
              isCurrent={true}
              isLoadding={isLoadding}
              isLast={index === listMainQandA.length - 1}
            />
          ) : element.isQA ? (
            <IsQA key={index} messageBot={element} />
          ) : (
            <Message
              hanleChooseQA={chooseQA}
              handleBreadCrumb={breadCrumb}
              key={index}
              messageBot={element}
              handleChooseOptions={chooseOption}
              handleChooseOpt={chooseOpt}
              handleYesNo={chooseYesNo}
              active={element.active}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </ChatFrame>
    );
  };

  return (
    <ChatBotLayout>
      {handleRenderListMainQandA()}
      <div className={styles.bottom}>
        <Input>
          <form onSubmit={handleSubmit}>
            <input
              disabled={isLoadding}
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              value={form.value}
              placeholder='入力はここに...'
              type='text'
              className={styles.bottom__input}
            />
          </form>
        </Input>
        <Answer
          chooseAnwer={handleChooseAnswer}
          listAnswer={listMainQandA[listMainQandA.length - 1]?.questions}
        />
      </div>
    </ChatBotLayout>
  );
};
