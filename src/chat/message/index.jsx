import React from 'react';
import styles from './index.module.scss';
import Bot04Img from '../../assets/img/bot-04.png';
import clsx from 'clsx';

import '../../theme/message-color/styles.scss';

export const Message = ({ messageBot, active, hanleChooseOptions, handleBreadCrumb }) => {
  const handleMessage = () => {
    if (messageBot.messageOptionsRow && active) {
      return (
        <div className={styles.message__options}>
          {messageBot.messageOptionsRow.map((messageOption, index) => (
            <div
              onClick={() => hanleChooseOptions(messageOption.message)}
              key={index}
              className={clsx(`${messageOption.color}`)}
            >
              {messageOption.message}
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
              onClick={() => hanleChooseOptions(messageOption.message)}
              key={index}
              className={clsx(``)}
            >
              {messageOption.message}
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
              onClick={() => hanleChooseOptions(messageOption.message)}
              key={index}
              className={clsx(``)}
            >
              {messageOption.message}
            </div>
          ))}
        </div>
      );
    }
  };

  let lastBreadCrumb =
    messageBot.breadCrumbs[messageBot.breadCrumbs.length - 1];

  // const handleBreadCrumb = (message) => {
  //   console.log('index of breadcurmbs', message);
  // };

  return (
    <div className={styles.message__container}>
      <img className={styles.message__img} src={Bot04Img} alt='bot img' />
      <div className={styles.message}>
        <div className={clsx(styles.message__margin, styles.message__header)}>
          {messageBot.breadCrumbs
            .filter(
              (breadCrumb, index) => index < messageBot.breadCrumbs.length - 1
            )
            .map((breadCrumb, index) => (
              <div key={index}>
                <span
                  onClick={() => handleBreadCrumb(breadCrumb)}
                >{`${breadCrumb}`}</span>
              </div>
            ))}
          <div key={messageBot.breadCrumbs.length}>{`${lastBreadCrumb}`}</div>
        </div>
        <div className={clsx(styles.message__margin, styles.message__body)}>
          <div
            className={clsx(styles.questionTitle, { [styles.gray]: !active })}
          >
            {messageBot.questionTitle}
          </div>
        </div>
        {handleMessage()}
      </div>
    </div>
  );
};
