import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import PlayerContextProvider from './context/PlayerContext.jsx';
import router from './routes/routes.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PlayerContextProvider>
      <RouterProvider router={router} />
    </PlayerContextProvider>
  </StrictMode>
);
