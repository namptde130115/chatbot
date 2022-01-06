import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';
import botImg from '../assets/img/bot-header.png';
import { Message } from './message/index';
import { Answer } from './answer/index';
import { AnswerChat } from '../chat/answer-chat/index';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { getMessage, questionMain, startChat } from '../redux/messageSlice';
import { IsQA } from './isQA';

// require('dotenv')
// test user.name

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

  useEffect(() => {
    scrollToBottom();
  }, [listMainQandA.length]);

  useEffect(() => {
    dispatch(
      startChat({
        categories: '',
        clientType: 'WIDGET',
        referrerUrl:
          'https://localhost:8443/draft/63357bbdc04ce1afe94b063dd7670970',
        tenantId: '63357bbdc04ce1afe94b063dd7670970',
        uid: '',
      })
    );
  }, [dispatch]);

  const [isHidden, setIsHidden] = useState(false);
  const HiddenBody = () => {
    setIsHidden(!isHidden);
  };

  const handleChooseAnswer = async (message, index) => {
    console.log('message from choose answer:', message, index);
    await dispatch(questionMain(message));
    await dispatch(
      getMessage({
        chatId: currentQandA?.chatId,
        clientType: 'WIDGET',
        content: {
          inputText: '',
          options: [message],
          question: '###SUGGEST###',
          response: index,
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
    await dispatch(questionMain(message));
    await dispatch(
      getMessage({
        chatId: currentQandA?.chatId,
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

  const chooseOpt = async (message, index) => {
    console.log('choose opt: ', message, index);
    await dispatch(questionMain(message.value));
    await dispatch(
      getMessage({
        chatId: currentQandA?.chatId,
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
      getMessage({
        chatId: currentQandA?.chatId,
        clientType: 'WIDGET',
        contents: {
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

  const breadCrumb = async (message, index) => {
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
        contents: {
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
      <div className={styles.body}>
        {listMainQandA.map((element, index) => {
          return element.type === 'question' ? (
            <AnswerChat key={index} title={element.title} />
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
      </div>
    );
  };

  return (
    <div className={clsx({ [styles.posion]: true })}>
      <div className={styles.header}>
        <div className={styles.header__inner}>
          <img
            onClick={HiddenBody}
            className={styles.bot__img}
            src={botImg}
            alt='bot-header-img'
          />
          <div className={styles.header__text}>
            <div className={styles.header__message}>
              <div className={styles.header__message__text}>
                <span onClick={HiddenBody}>24時間受け付けてます！</span>
                <div className={styles.header__message__retangle}></div>
              </div>
            </div>
            <span onClick={HiddenBody} className={styles.header__span}>
              FAQチャット
            </span>
          </div>
        </div>
      </div>
      <div
        className={clsx(styles.body__container, {
          [styles.isHidden]: isHidden,
        })}
      >
        {handleRenderListMainQandA()}
        <div className={styles.bottom}>
          <div className={styles.bottom__input__div}>
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
          </div>
          <Answer
            chooseAnwer={handleChooseAnswer}
            listAnswer={listMainQandA[listMainQandA.length - 1]?.questions}
          />
        </div>
      </div>
    </div>
  );
};
