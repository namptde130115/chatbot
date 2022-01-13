import React from 'react';
import styles from './index.module.scss';
import { TypingIndicator } from '../../../components/typing-indicator/index';

export const AnswerChat = ({ title, isLast, isLoadding }) => {
  return (
    <>
      <div className={styles.answerchat__container}>
        <div className={styles.answerchat}>{title}</div>
      </div>
      {isLast && isLoadding && <TypingIndicator />}
    </>
  );
};
