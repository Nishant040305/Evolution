import './App.css'
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import url from './url.json';
import LoginMain from './container/LoginMain';
import WebsiteBuilder from "./components/MainPage/WebsiteBuilder";

function App() {
  return(
    <Routes>
      <Route path={url.Login} element={<LoginMain/>}></Route>
      <Route path="/main" element={<WebsiteBuilder/>}></Route>
    </Routes>
  )
}

export default App;
