import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './global.less';

import { App } from './page/Page';
import { ErrorPage } from './error';
import { Layout } from './page/Layout';
import { Artical } from './page/artical';
import { ArticalDetail } from './page/artical/[id]';

import { SentryInit } from '@infra/sentry';

// sentry 监控
SentryInit();

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
      {
        path: '/',
        children: [
          {
            index: true,
            element: <App /> //这个是page
          },
          {
            path: 'artical',
            element: <Artical />
          },
          {
            path: 'artical/:id',
            element: <ArticalDetail />
          }
        ]
      }
    ]
  }
]);

const root = createRoot(document.getElementById('app') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
