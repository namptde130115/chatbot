import clsx from 'clsx';
import styles from './index.module.scss';
import styled from 'styled-components';
import Group1 from '../../../assets/img/Group1.png';
import { Message } from '../../common-message';

const Scenario = styled.div`
  background-color: ${(props) => props.theme.scenarioBackground};
  color: ${(props) => props.theme.scenarioColor};
  border: ${(props) => `1px solid ${props.theme.scenarioBorderColor}`};
  font-size: ${(props) => props.theme.scenarioFontSize};
`;

export const ListScenario = ({ listScenario }) => {
  const handleChooseOpt = (index) => {
    console.log('handleChooseOpt at: ', index);
  };
  return (
    <>
      <Message message={'グエンホアンサン'} />
      <div className={clsx(styles.scenario__container)}>
        {listScenario.map((item, index) => (
          <Scenario
            key={index}
            className={clsx(styles.scenario)}
            onClick={() => handleChooseOpt(index)}
          >
            <img src={Group1} alt='image1' />
            {'航空券予約航空券予約'}
          </Scenario>
        ))}
      </div>
    </>
  );
};
