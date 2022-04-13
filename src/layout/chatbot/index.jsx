import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';
import styled from 'styled-components';
import logochat from '../../assets/img/logoChatBot.png';
import { useTheme } from 'styled-components';

const HeaderChatBot = styled.div`
  background-color: ${(props) => props?.theme?.headerBackground};
`;

const TopTitle = styled.p`
  color: ${(props) => props.headerColorTop};
  font-size: ${(props) => props?.theme?.headerFonsizeTop};
`;

const BottomTitle = styled.p`
  color: ${(props) => props?.theme?.headerColorBot};
  font-size: ${(props) => props?.theme?.headerFonsizeBot};
`;

const MinusHide = styled.div`
  background-color: ${(props) => props?.theme?.minusBackground};
`;

export const ChatBotLayout = ({ children }) => {
  const theme = useTheme();
  const [isHidden, setIsHidden] = useState(false);

  const HiddenBody = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div
      className={clsx(styles.posion, {
        [styles.headerChatBot__zoomIn]: isHidden,
      })}
    >
      <HeaderChatBot
        headerBackground={theme.headerBackground}
        className={clsx(styles.headerChatBot)}
      >
        <img src={logochat} alt='chatbot-logo' className={clsx(styles.img)} />
        <div className={clsx(styles.title)}>
          <TopTitle
            className={clsx(styles.topTitle)}
            headerColorTop={theme.headerColorTop}
            headerFonsizeTop={theme.headerFonsizeTop}
          >
            {theme.headerTitleTop}
          </TopTitle>
          <BottomTitle
            className={clsx(styles.bottomTitle)}
            headerColorBot={theme.headerColorBot}
            headerFonsizeBot={theme.headerFonsizeBot}
          >
            {theme.headerTitleBot}
          </BottomTitle>
        </div>
        <div className={clsx(styles.container__minus)} onClick={HiddenBody}>
          <MinusHide
            minusBackground={theme.minusBackground}
            className={clsx(styles.minus)}
          />
        </div>
      </HeaderChatBot>
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
