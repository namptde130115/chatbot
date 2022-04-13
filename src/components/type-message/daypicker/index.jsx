import styles from './index.module.scss';
import clsx from 'clsx';
import { DatePicker } from 'antd';
import moment from 'moment';

export const DayPicker = () => {
  const onOk = (value) => {
    console.log('onOk: ', value);
  };

  function disableDateRanges(range = { startDate: false, endDate: false }) {
    const { startDate, endDate } = range;
    return function disabledDate(current) {
      let startCheck = true;
      let endCheck = true;
      if (startDate) {
        startCheck = current && current < moment(startDate, 'YYYY-MM-DD');
      }
      if (endDate) {
        endCheck = current && current > moment(endDate, 'YYYY-MM-DD');
      }
      return (startDate && startCheck) || (endDate && endCheck);
    };
  }

  const isCheckCurrentDay = () => {
    // Check start date < ngay hien tai thi lay ngay hien tai lam start date
    const currentDate = moment().format('YYYY-MM-DD');
    // console.log('currentDate', currentDate);
    // console.log(moment(currentDate).isBefore('2022-4-15'));
    return moment(currentDate).isBefore('2022-4-15');
  };

  return (
    <div className={clsx(styles.dayTimePicker__container)}>
      <DatePicker
        size='large'
        className={clsx(styles.dayTimePicker)}
        placeholder='時間を選択してください'
        showTime
        onOk={onOk}
        placement='topLeft'
        style={{ width: '100%' }}
        disabledDate={disableDateRanges({
          endDate: new Date('2022-04-25'),
          startDate: isCheckCurrentDay()
            ? new Date('2022-04-15')
            : new Date('2022-04-13'),
        })}
      />
    </div>
  );
};
