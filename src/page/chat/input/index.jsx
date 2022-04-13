import React from 'react';

//image
import { CommonInput } from '../../../components/common-input';
import { Message } from '../../../components/common-message';
import { Option } from '../../../components/type-message/option';
import { DayPicker } from '../../../components/type-message/daypicker';

export const InputType = ({ type }) => {
  const handleTypeInput = () => {
    switch (type) {
      case 'scenario':
        return <CommonInput />;
      case 'dropdown':
        return <CommonInput />;
      case 'options':
        return <Option />;
      case 'input:text':
        return <CommonInput />;
      case 'input:mail':
        return <CommonInput />;
      case 'input:number':
        return <CommonInput />;
      case 'datepicker':
        return <DayPicker />;
      default:
        return <Message message={'グエンホアンサン'} />;
    }
  };
  return handleTypeInput();
};
