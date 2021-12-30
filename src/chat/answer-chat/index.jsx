import React from 'react';
import styles from './index.module.scss';

export const AnswerChat = ({ title }) => {
  return (
    <div className={styles.answerchat__container}>
      <div className={styles.answerchat}>{title}</div>
    </div>
  );
};
