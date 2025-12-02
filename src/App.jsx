import React from 'react'

import Body from './components/Body'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Eventpage from './components/Eventpage'
import Login from './components/Login'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import EditEventForm from './components/EditEventForm'

function App() {
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Body/>}>
            <Route path='/' element={<Eventpage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/update/:id' element={<EditEventForm/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>

    </>
  )
}

export default App
