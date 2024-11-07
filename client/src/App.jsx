// src/App.js
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import url from "./url.json";
import LoginMain from "./container/LoginMain";
import WebsiteBuilder from "./container/WebsiteBuilder";
import ProjectDashboard from "./container/ProjectDashboard";
import { verifyUser } from "./Store/userSlice";
import ImageTest from "./test/ImageTest";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(verifyUser());
  }, [dispatch,isAuthenticated]);

  return (
    <Routes>
      <Route path={url.Dashboard} element={isAuthenticated ? <ProjectDashboard /> : <LoginMain />} />
      <Route path={url.Main} element={isAuthenticated ? <WebsiteBuilder /> : <LoginMain />} />
      <Route path="Test" element={<ImageTest/>}></Route>
      <Route path="*" element={isAuthenticated ? <ProjectDashboard /> : <LoginMain />} />
    </Routes>
  );
}

export default App;
