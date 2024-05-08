import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './page/App';
import { ErrorPage } from './error';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './page/Layout';

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
            element: <App />
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
