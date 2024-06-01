import React, { useState } from 'react';

import { MenuItem } from '../MenuItem';

import styles from './index.module.less';

export const Menulist = (props) => {
  const [currentActiveName, setCurrentActiveName] = useState<string>('item1');

  return (
    <div className={styles.container}>
      <MenuItem
        itemName="item1"
        active={currentActiveName === 'item1'}
        onClick={() => setCurrentActiveName('item1')}
      />
      <MenuItem
        itemName="item2"
        active={currentActiveName === 'item2'}
        onClick={() => setCurrentActiveName('item2')}
      />
    </div>
  );
};
