import './App.css'
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import url from './url.json';
import LoginMain from './container/LoginMain';
function App() {
  return(
    <Routes>
      <Route path={url.Login} element={<LoginMain/>}></Route>
    </Routes>
  )
}

export default App
