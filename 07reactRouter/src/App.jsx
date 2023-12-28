import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import { RouterProvider } from 'react-router-dom'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Header/>
     <Footer/>
     <Home/>


<RouterProvider router={router}/>

      
    </>
  )
}

export default App
