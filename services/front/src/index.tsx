import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const rootElement = document.getElementById('root')

// In development mode, React.StrictMode renders the app twice on each update,
// which helps to catch potential issues and warn about unsafe practices. However,
// in production mode, it renders the app only once for better performance.
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} else {
  throw new Error('Root element not found')
}
