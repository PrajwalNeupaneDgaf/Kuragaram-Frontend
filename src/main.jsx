import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppContext from './Context/AppContext.jsx'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')).render(
  <AppContext>
       <App />
       <Toaster theme='black' duration={1000} position='top-center'/>
  </AppContext>
)
