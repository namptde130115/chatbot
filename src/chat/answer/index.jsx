import React from 'react';
import styles from './index.module.scss';

export const Answer = ({ listAnswer, chooseAnwer }) => {
  return (
    <div className={styles.bottom__options__div}>
      {listAnswer
        ? listAnswer.map((answer, index) => (
            <div
              onClick={() => chooseAnwer(answer, index)}
              key={index}
              className={styles.bottom__option}
            >
              {answer}
            </div>
          ))
        : null}
    </div>
  );
};
