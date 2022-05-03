import './App.css'
import { Link, Route, Routes } from 'react-router-dom'

const Home = () => <h1>Home</h1>

const Test = () => <h1>Test</h1>

function App () {
  return (
    <div className='App'>
      <header>
        <h1>Test</h1>
        <nav>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/test'>Test</Link></li>
        </nav>
      </header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/test' element={<Test />} />
      </Routes>
    </div>
  )
}

export default App
