import React, { useState } from 'react';

import styles from './index.module.less';

import testTxt from './index.txt';

export const App = (props) => {
  // console.log('[dev] props', props);
  const [value, setValue] = useState<string>();

  const length = parseInt(value) || 0;

  return (
    <div
      className={styles.container}
      onClick={async () => {
        const name = await import('./LazyCom');
      }}
    >
      {testTxt}
      <input value={value} onChange={(valueIn) => setValue(valueIn.target.value)} />
      {new Array(length).fill(0).map((item) => {
        return <div>{item + 1}</div>;
      })}
    </div>
  );
};
