import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';
import styled from 'styled-components';
import botImg from '../../assets/img/bot-header.png';

const BubbleDialog = styled.span`
  background: ${(props) => props.theme.bubbleTitle?.background};
  color: ${(props) => props.theme.bubbleTitle?.color};
  font-size: ${(props) => props.theme.bubbleTitle?.fontSize};
  &::after {
    border-left: 13px solid ${(props) => props.theme.bubbleTitle?.background};
  }
`;

const TitleChatBot = styled.span`
  background: ${(props) => props.theme.chatBotTitle?.background};
  color: ${(props) => props.theme.chatBotTitle?.color};
  font-size: ${(props) => props.theme.chatBotTitle?.fontSize};
`;

export const ChatBotLayout = ({ children }) => {
  const [isHidden, setIsHidden] = useState(false);

  const HiddenBody = () => {
    setIsHidden(!isHidden);
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
                <BubbleDialog onClick={HiddenBody}>
                  24時間受け付けてます！
                </BubbleDialog>
              </div>
            </div>
            <TitleChatBot onClick={HiddenBody} className={styles.header__span}>
              FAQチャット
            </TitleChatBot>
          </div>
        </div>
      </div>
      <div
        className={clsx(styles.body__container, {
          [styles.isHidden]: isHidden,
        })}
      >
        {children}
      </div>
    </div>
  );
};
