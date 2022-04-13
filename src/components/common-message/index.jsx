import clsx from 'clsx';
import styled from 'styled-components';
import styles from './index.module.scss';

const MessageBox = styled.div`
  background-color: ${(props) => props.theme.messageBackground};
  font-size: ${(props) => props.theme.messageFontSize};
  color: ${(props) => props.theme.messageColor};
`;

export const Message = ({ message }) => {
  return <MessageBox className={clsx(styles.message)}>{message}</MessageBox>;
};
