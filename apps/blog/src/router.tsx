import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ErrorPage } from './error';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />
  }
]);

const root = createRoot(document.getElementById('app') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
