import React from 'react'
import StartPage from './Pages/StartPage'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import './App.css'
import Join from './Pages/Join'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Waiting from './Pages/Waiting'

const App = () => {
  return (
  <>
    <Router>
      <Routes>
        <Route element={ <StartPage/>} path='/'/>
        <Route element={ <Join/>} path='/join/room/:id'/>
        <Route element={ <Waiting/>} path='/wait/room/:id'/>
        <Route element={ <Login/>} path='/login'/>
        <Route element={ <Signup/>} path='/register'/>
      </Routes>
    </Router>
  </>
  )
}

export default App