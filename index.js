import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Prediction from './pages/Prediction';
import Models from './pages/Models';
import Training from './pages/Training';

const container = document.getElementById('root');

const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'prediction',
        element: <Prediction />,
      },
      {
        path: 'models',
        element: <Models />,
      },
      {
        path: 'training',
        element: <Training />,
      },
    ],
  },
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
