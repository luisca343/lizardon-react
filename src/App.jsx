import './App.css'
import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
const Frases = React.lazy(() => import('./components/frases/frases'))
const ChatPersona = React.lazy(() => import('./components/twitch/chatPersona'))
const Overlay = React.lazy(() => import('./components/twitch/overlay'))

const Home = () => <h1>Home</h1>

function App () {
  return (
    <div className='App'>
      <Suspense fallback='<div>Cargando...</div>'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/frases' element={<Frases />} />
          <Route path='/chatPersona/:id' element={<ChatPersona />} />
          <Route path='/overlay/:id' element={<Overlay />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
