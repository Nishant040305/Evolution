import React from "react";
import { Route, Routes } from "react-router-dom";
import url from "./url.json";
import LoginMain from "./container/LoginMain";
import WebsiteBuilder from "./container/WebsiteBuilder";
import ProjectDashboard from "./container/ProjectDashboard";

function App() {
  return (
    <Routes>
      <Route path={url.Login} element={<LoginMain />}></Route>
      <Route path={url.Dashboard} element={<ProjectDashboard />} />{" "}
      <Route path={url.Main} element={<WebsiteBuilder />}></Route>
    </Routes>
  );
}

export default App;
