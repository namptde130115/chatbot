import clsx from 'clsx';
import React from 'react';
import styles from './index.module.scss';
import styled from 'styled-components';
import { useTheme } from 'styled-components';

const AnswerBox = styled.div`
  background-color: ${(props) => props.theme.answerBackground};
  font-size: ${(props) => props.theme.messageFontSize};
  color: ${(props) => props.theme.messageColor};
`;

export const Answer = ({ answer, chooseAnwer }) => {
  const theme = useTheme();
  return (
    <div>
      <div className={clsx(styles.body)}>
        <AnswerBox
          messageBackground={theme.messageBackground}
          messageColor={theme.messageColor}
          messageFontSize={theme.messageFontSize}
          className={clsx(styles.message)}
        >
          {answer}
        </AnswerBox>
      </div>
    </div>
  );
};
