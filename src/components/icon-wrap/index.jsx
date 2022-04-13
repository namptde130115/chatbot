import React from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';

export const IconWrap = ({ icon, className, onClick, size, color }) => {
  return (
    <div
      className={clsx(className, styles.icon__wrap)}
      style={{ fontSize: size, color: color }}
      onClick={onClick}
    >
      {icon}
    </div>
  );
};
