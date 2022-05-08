import './App.css'
import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
const Frases = React.lazy(() => import('./components/frases/frases'))

const Home = () => <h1>Home</h1>

function App () {
  return (
    <div className='App'>
      <Suspense fallback='<div>Cargando...</div>'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/frases' element={<Frases />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
