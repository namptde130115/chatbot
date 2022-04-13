import React from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';

//image
import { ListScenario } from '../../../components/type-message/scenario';
import { ListDropdown } from '../../../components/type-message/dropdown';
import { Message } from '../../../components/common-message';

const listScenario = [1, 2, 3, 4];
const listDropdown = [1, 2, 3, 4];

export const MessageBot = ({ type }) => {
  const handleTypeMessage = () => {
    switch (type) {
      case 'scenario':
        return <ListScenario listScenario={listScenario} />;
      case 'dropdown':
        return <ListDropdown listDropdown={listDropdown} />;
      case 'options':
        return <Message message={'グエンホアンサン'} />;
      case 'input:text':
        return <Message message={'グエンホアンサン'} />;
      case 'input:mail':
        return <Message message={'グエンホアンサン'} />;
      case 'input:number':
        return <Message message={'グエンホアンサン'} />;
      case 'datepicker':
        return <Message message={'グエンホアンサン'} />;
      default:
        return <Message message={'グエンホアンサン'} />;
    }
  };
  return (
    <div>
      <div className={clsx(styles.body)}>{handleTypeMessage()}</div>
    </div>
  );
};
