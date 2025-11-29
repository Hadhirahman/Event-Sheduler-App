import React from 'react'
import Header from './components/Header'
import Body from './components/Body'
import EventForm from './components/EventForm'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Eventpage from './components/Eventpage'
import Login from './components/Login'


function App() {
  return (
    <>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Body/>}>
            <Route path='/event' element={<Eventpage/>}/>
            <Route path='/login' element={<Login/>}/>
          </Route>
         
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
