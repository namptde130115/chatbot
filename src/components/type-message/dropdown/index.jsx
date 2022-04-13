import clsx from 'clsx';
import styles from './index.module.scss';
import styled from 'styled-components';
import { Message } from '../../common-message';

const Dropdown = styled.div`
  background-color: ${(props) => props.theme.scenarioBackground};
  color: ${(props) => props.theme.scenarioColor};
  border: ${(props) => `1px solid ${props.theme.scenarioBorderColor}`};
  font-size: ${(props) => props.theme.scenarioFontSize};
`;

export const ListDropdown = ({ listDropdown }) => {
  const handleChooseOpt = (index) => {
    console.log('handleChooseOpt at: ', index);
  };
  return (
    <>
      <Message message={'グエンホアンサン'} />
      <div className={clsx(styles.dropdown__container)}>
        {listDropdown.map((item, index) => (
          <Dropdown
            key={index}
            className={clsx(styles.dropdown)}
            onClick={() => handleChooseOpt(index)}
          >
            {'航空券予約航空券予約'}
          </Dropdown>
        ))}
      </div>
    </>
  );
};
