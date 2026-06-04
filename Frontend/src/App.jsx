import { useState } from 'react'
import './App.css'
import MentorOwlHome from "./home.page"
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <MentorOwlHome/>
    </>
  )
}

export default App
