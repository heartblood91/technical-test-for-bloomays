import React from 'react'
import 'sanitize.css'

import { DashboardView } from './views'

const App = () => {
  return (
    <div
      style={{
        backgroundColor: 'antiquewhite',
        width: '100vw',
        height: '100vh'
      }}
    >
      <DashboardView />
    </div>
  )
}

export default App
