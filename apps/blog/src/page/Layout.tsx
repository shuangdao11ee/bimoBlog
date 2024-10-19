import React from 'react';
import { Outlet } from 'react-router-dom';
import cls from 'classnames';
import { Menulist } from './components';

import styles from './index.module.less';
import { name } from './LazyCom';

export const Layout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <div className={styles.title}>Bimo's Blog {name}</div>
        <Menulist />
      </div>
      <Outlet />
    </div>
  );
};
