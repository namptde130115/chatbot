import React from 'react';
import styles from './index.module.scss';
import Bot04Img from '../../assets/img/bot-04.png';
import clsx from 'clsx';

import '../../theme/message-color/styles.scss';
// import { useSelector } from 'react-redux';

export const Message = ({
  messageBot,
  active,
  handleChooseOptions,
  handleYesNo,
  handleBreadCrumb,
  handleChooseOpt,
}) => {
  // const breadCrumbs = useSelector((state) => state.message.breadCrumbs);

  const handleMessage = () => {
    if (
      active &&
      !messageBot.optGroup &&
      messageBot.messageOptionsRow[0] === 'はい'
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
          {messageBot.messageOptionsRow.map((messageOption, index) => (
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

  // const handleBreadCrumb = (message) => {
  //   console.log('index of breadcurmbs', message);
  // };

  return (
    <div>
      {handleMessageQA()}
      <div className={styles.message__container}>
        <img className={styles.message__img} src={Bot04Img} alt='bot img' />
        <div className={styles.message}>
          <div className={clsx(styles.message__margin, styles.message__header)}>
            {messageBot.breadCrumbs
              ?.filter(
                (breadCrumb, index) => index < messageBot.breadCrumbs.length - 1
              )
              ?.map((breadCrumb, index) => (
                <div key={index}>
                  <span
                    onClick={() => handleBreadCrumb(breadCrumb, index)}
                  >{`${breadCrumb}`}</span>
                </div>
              ))}
            <div
              key={messageBot.breadCrumbs?.length}
            >{`${lastBreadCrumb}`}</div>
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
    </div>
  );
};
