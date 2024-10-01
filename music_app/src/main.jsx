import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import PlayerContextProvider from './context/PlayerContext.jsx'
import routes from './routes/routes.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router= {routes}>

        {/* <App /> */}

    </RouterProvider>
    
  </StrictMode>,
)
