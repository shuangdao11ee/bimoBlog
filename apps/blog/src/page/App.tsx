import React from 'react';
import { a } from '@infra/components';
import styles from './index.module.less';

export const App = (props) => {
  // console.log('[dev] props', props);

  return (
    <div className={styles.container}>
      <h1>Hello world! {a}</h1>
    </div>
  );
};
