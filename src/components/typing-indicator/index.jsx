import React from 'react';
import styles from './index.module.scss';

export const TypingIndicator = () => {
  return (
    <div className={styles.typingIndicator}>
      <div className={styles.typing}>
        <span className={styles.typing__bullet}></span>
        <span className={styles.typing__bullet}></span>
        <span className={styles.typing__bullet}></span>
      </div>
      <div className={styles.typing__text}><span>ChatBot is typing...</span></div>
    </div>
  );
};
