import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';
import botImg from '../assets/img/bot-header.png';
import { Message } from './message/index';
import { Answer } from './answer/index';
import { AnswerChat } from '../chat/answer-chat/index';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { question, sendMessage } from '../redux/messageSlice';

export const ChatBot = () => {
  const listQandA = useSelector((state) => state.message.listQandA);
  const isLoadding = useSelector((state) => state.message.isLoadding);
  const [form, setForm] = useState({ value: '' });
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [listQandA.length]);

  useEffect(() => {
    dispatch(sendMessage());
  }, []);

  const [isHidden, setIsHidden] = useState(false);
  const HiddenBody = () => {
    setIsHidden(!isHidden);
  };

  const handleChooseAnswer = async (message) => {
    // console.log('message from choose answer:', message);
    await dispatch(question(message));
    await dispatch(sendMessage());
  };

  const chooseOption = async (message) => {
    // console.log('message from choose option:', message);
    await dispatch(question(message));
    await dispatch(sendMessage());
  };

  const breadCrumb = async (message) => {
    console.log('message from breadCrumb:', message);
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
    await dispatch(question(form.value));
    setForm({ value: '' });
    await dispatch(sendMessage());
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  // console.log('rerender');
  // console.log('listQandA: ', listQandA);

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
        <div className={styles.body}>
          {listQandA.map((element, index) => {
            return element.type === 'question' ? (
              <AnswerChat key={index} title={element.title} />
            ) : (
              <Message
                handleBreadCrumb={breadCrumb}
                key={index}
                messageBot={element}
                hanleChooseOptions={chooseOption}
                active={element.active}
              />
            );
          })}
          <div ref={messagesEndRef} />
        </div>
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
            listAnswer={listQandA[listQandA.length - 1]?.listAnswer}
          />
        </div>
      </div>
    </div>
  );
};
