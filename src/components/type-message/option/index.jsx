import styles from './index.module.scss';
import clsx from 'clsx';
import { Select } from 'antd';
import { UpOutlined } from '@ant-design/icons';

export const Option = () => {
  const { Option } = Select;
  return (
    <Select
      className={clsx(styles.select__container)}
      placeholder='ドロップダウンボタン'
      style={{ width: '96%' }}
      dropdownMatchSelectWidth={false}
      placement='topRight'
      suffixIcon={<UpOutlined className={clsx(styles.upicon)} />}
    >
      <Option value='HangZhou'>HangZhou #310000</Option>
      <Option value='NingBo'>NingBo #315000</Option>
      <Option value='WenZhou'>WenZhou #325000</Option>
    </Select>
  );
};
