import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import MainPage from './pages/MainPage'

import './App.css'

const App = () => {
  return (
    <div className='App'>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path='/auth' element={<AuthPage />} />
            <Route path='/home' element={<MainPage />} />
            <Route path='' element={<Navigate to='/auth' />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  )
}

export default App
