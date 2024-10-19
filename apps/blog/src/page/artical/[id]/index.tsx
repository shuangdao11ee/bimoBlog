import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Editor, Viewer } from '@bytemd/react';
import 'bytemd/dist/index.css';

import styles from './index.module.less';

export const ArticalDetail = (props) => {
  const [value, setValue] = useState<string>('');
  console.log('[dev] value', value);
  const params = useParams();
  const { id } = params;

  return (
    <div className={styles.container}>
      <Editor
        value={value}
        onChange={(v) => {
          setValue(v);
        }}
      />
      <Viewer value={value} />
    </div>
  );
};
