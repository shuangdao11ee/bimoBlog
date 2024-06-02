import React from 'react';
import { useParams } from 'react-router-dom';

export const ArticalDetail = (props) => {
  const params = useParams();
  const { id } = params;

  return <div>Artical Detail {id}</div>;
};
