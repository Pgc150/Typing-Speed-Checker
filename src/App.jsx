import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Typingtest from './components/Typingtest'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Typingtest/>
     </>
  )
}

export default App
