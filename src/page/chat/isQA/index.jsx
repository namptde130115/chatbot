import React from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';
import styled from 'styled-components';
import { TypingIndicator } from '../../../components/typing-indicator/index';

const IsQuestion = styled.div`
  background: ${(props) => props.theme.qa[0]?.background};
  color: ${(props) => props.theme.qa[0]?.color};
  font-size: ${(props) => props.theme.qa[0]?.fontSize};
`;

const IsAnswer = styled.div`
  background: ${(props) => props.theme.qa[1]?.background};
  color: ${(props) => props.theme.qa[1]?.color};
  font-size: ${(props) => props.theme.qa[1]?.fontSize};
`;

export const IsQA = ({ messageBot }) => {
  console.log('IsQA', messageBot);

  return (
    <div>
      <div className={styles.message__options__isQA}>
        {messageBot.listQandA && (
          <div>
            <IsQuestion className={clsx(styles.message__isQA)}>
              {messageBot.listQandA[0].value}
            </IsQuestion>
            <IsAnswer
              className={clsx(styles.message__isQA, styles.message__isQA__ans)}
            >
              {messageBot.listQandA[1].value}
            </IsAnswer>
          </div>
        )}
      </div>
    </div>
  );
};
