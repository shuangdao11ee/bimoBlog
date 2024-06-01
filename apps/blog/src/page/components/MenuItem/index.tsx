import React from 'react';

import styles from './index.module.less';

import cls from 'classnames';

interface MenuItemProps {
  itemName: string;
  active: boolean;
  onClick: React.MouseEventHandler<any>;
}

export const MenuItem = (props: MenuItemProps) => {
  const { itemName, active, onClick } = props;

  return (
    <div
      className={cls(styles.container, {
        [styles.active]: active
      })}
      onClick={onClick}
    >
      <div className={styles.text}>{itemName}</div>
    </div>
  );
};
