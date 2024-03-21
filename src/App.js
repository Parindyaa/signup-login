import React from 'react'
import Sign_up from './sign_up'
import Login from './login'
import Rout from './rout'
import { BrowserRouter } from 'react-router-dom'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Rout/>
    </BrowserRouter>
     
    </>
  )
}

export default App



