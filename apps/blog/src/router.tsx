import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './global.less';

import { App } from './page/Page';
import { ErrorPage } from './error';
import { Layout } from './page/Layout';
import { ArticalDetail } from './page/artical/[id]';

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
