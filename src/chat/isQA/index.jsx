import React from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';

export const IsQA = ({ messageBot, hanleChooseQA }) => {
  console.log('IsQA', messageBot);
  return (
    <div>
      <div className={styles.message__options__isQA}>
        {messageBot.listQandA &&
          messageBot.listQandA.map((messageOption, index) => (
            <div
              key={index}
              className={clsx(styles.message__isQA, {
                [styles.message__isQA__ans]: index === 1,
              })}
            >
              {messageOption.value}
            </div>
          ))}
      </div>
    </div>
  );
};
