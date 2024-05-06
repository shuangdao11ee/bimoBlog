import React from 'react';
import { useRouteError } from 'react-router-dom';

export function ErrorPage() {
  // 被迫写any
  const error = useRouteError() as any;

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>error</i>
      </p>
    </div>
  );
}
