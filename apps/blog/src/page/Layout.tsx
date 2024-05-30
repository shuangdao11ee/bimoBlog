import React from 'react';
import { Outlet } from 'react-router-dom';
import cls from 'classnames';

import styles from './index.module.less';

export const Layout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>Layout</div>
      <Outlet />
    </div>
  );
};
