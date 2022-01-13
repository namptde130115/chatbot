import React from 'react';
import styles from './index.module.scss';
import Bot04Img from '../../../assets/img/bot-04.png';
import clsx from 'clsx';

import '../../../theme/message-color/styles.scss';
import styled from 'styled-components';
// import { useSelector } from 'react-redux';

const MainMessage = styled.div`
  background: ${(props) => props.theme.message?.background};
  color: ${(props) => props.theme.message?.color};
  font-size: ${(props) => props.theme.message?.fontSize};
  &::after {
    border-right: 8px solid ${(props) => props.theme.message?.background};
  }
`;

const Breadcrumbs = styled.div`
  color: ${(props) => props.theme.message?.color};
  font-size: ${(props) => props.theme.message?.fontSize};
`;

export const Message = ({
  messageBot,
  active,
  handleChooseOptions,
  handleYesNo,
  handleBreadCrumb,
  handleChooseOpt,
}) => {
  const handleMessage = () => {
    if (
      active &&
      !messageBot?.optGroup &&
      messageBot?.messageOptionsRow?.includes('はい')
    ) {
      return (
        <div className={clsx(styles.message__options, styles.yesNoOptions)}>
          {messageBot.messageOptionsRow.map((messageOption, index) => (
            <div
              onClick={() => handleYesNo(messageOption, index)}
              key={index}
              className={
                messageOption.color
                  ? clsx(`${messageOption.color}`, styles.yesNoBtn)
                  : clsx(`blue`, styles.yesNoBtn)
              }
            >
              {messageOption}
            </div>
          ))}
        </div>
      );
    }
    if (active && !messageBot.optGroup && !messageBot.isGenerated) {
      return (
        <div className={styles.message__options}>
          {messageBot?.messageOptionsRow?.map((messageOption, index) => (
            <div
              onClick={() => handleChooseOptions(messageOption, index)}
              key={index}
              className={
                messageOption.color
                  ? clsx(`${messageOption.color}`)
                  : clsx(`blue`)
              }
            >
              {messageOption}
            </div>
          ))}
        </div>
      );
    }
    if (messageBot.optGroup && active) {
      return (
        <div className={styles.message__options__opt}>
          {messageBot.messageOptionsRow.map((messageOption, index) => (
            <div key={index}>
              <div>{messageOption.title}</div>
              <div
                onClick={() => handleChooseOpt(messageOption, index)}
                className={styles.message__options__default}
              >
                {messageOption.value}
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (messageBot.isGenerated && active) {
      return (
        <div className={styles.message__options}>
          {messageBot.messageOptionsRow.map((messageOption, index) => (
            <div
              onClick={() => handleChooseOptions(messageOption, index)}
              key={index}
              className={clsx(`blue`, {
                [`green`]:
                  messageBot.stateButtons.reduce_filter.index !== index,
              })}
            >
              {messageOption}
            </div>
          ))}
        </div>
      );
    }
    if (messageBot.messageOptionsCol && active) {
      return (
        <div className={styles.message__options__col}>
          {messageBot.messageOptionsCol.map((messageOption, index) => (
            <div
              onClick={() => handleChooseOptions(messageOption)}
              key={index}
              className={clsx(``)}
            >
              {messageOption}
            </div>
          ))}
        </div>
      );
    }
    if (messageBot.messageOptionsCol_2 && active) {
      return (
        <div className={styles.message__options__col_2}>
          {messageBot.messageOptionsCol_2.map((messageOption, index) => (
            <div
              onClick={() => handleChooseOptions(messageOption)}
              key={index}
              className={clsx(``)}
            >
              {messageOption}
            </div>
          ))}
        </div>
      );
    }
  };

  const handleMessageQA = () => {
    if (messageBot['0']?.isQA) {
      return (
        <div
          className={clsx(styles.isQA__container, {
            [styles.isHidden]: !messageBot.listQandA,
          })}
        >
          {messageBot.listQandA
            ? messageBot.listQandA.map((messageOption, index) => (
                <div
                  key={index}
                  className={clsx(styles.message__isQA, {
                    [styles.message__isQA__ans]: index === 1,
                  })}
                >
                  {messageOption.value}
                </div>
              ))
            : null}
        </div>
      );
    } else {
    }
  };

  let lastBreadCrumb = messageBot.breadCrumbs
    ? messageBot.breadCrumbs[messageBot.breadCrumbs?.length - 1]
    : [];

  return (
    <div>
      {handleMessageQA()}
      <div className={styles.message__container}>
        <img className={styles.message__img} src={Bot04Img} alt='bot img' />
        <div className={styles.message}>
          <Breadcrumbs
            className={clsx(styles.message__margin, styles.message__header)}
          >
            {messageBot.breadCrumbs
              ?.filter(
                (breadCrumb, index) => index < messageBot.breadCrumbs.length - 1
              )
              ?.map((breadCrumb, index) => (
                <div key={index}>
                  <span
                    className={clsx({ [styles.cusor]: active })}
                    onClick={() => handleBreadCrumb(breadCrumb, index, active)}
                  >{`${breadCrumb}`}</span>
                </div>
              ))}
            <div
              key={messageBot.breadCrumbs?.length}
            >{`${lastBreadCrumb}`}</div>
          </Breadcrumbs>
          <MainMessage
            className={clsx(styles.message__margin, styles.message__body)}
          >
            <div
              className={clsx(styles.questionTitle, {
                [styles.gray]: !active,
              })}
            >
              {messageBot.questionTitle}
            </div>
          </MainMessage>
          {handleMessage()}
        </div>
      </div>
    </div>
  );
};
