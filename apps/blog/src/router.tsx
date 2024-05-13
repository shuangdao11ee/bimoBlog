import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from './page/Page';
import { ErrorPage } from './error';
import { Layout } from './page/Layout';

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
      {
        path: '/',
        // element: <App />, 这个是layout
        children: [
          {
            index: true,
            element: <App /> //这个是page
          },
          {
            path: 'artical',
            element: <div>test</div>
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
