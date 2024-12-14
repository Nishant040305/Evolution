import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import url from "./url.json";
import LoginMain from "./container/LoginMain";
import WebsiteBuilder from "./container/WebsiteBuilder";
import ProjectDashboard from "./container/ProjectDashboard";
import { verifyUser } from "./Store/userSlice";
import SettingsPage from "./components/Dashboard/SettingsPage";
import LandingPage from "./pages/Landing_Page";
import MainLayout from "./pages/Profile_Page";

import { useSocketConnect } from "./hooks/SocketConnect";
import ChatTest from "./test/chatTEst";
import SocialMain from "./container/SocialMain";
const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(verifyUser());
  }, [dispatch]);
  useSocketConnect();
  return (
    <Routes>
      {/* Landing Page */}
      <Route path={url.LandingPage} element={isAuthenticated?<ProjectDashboard />:<LandingPage />} />

      {/* Login Page */}
      <Route path={url.Login} element={<LoginMain />} />

      {/* Authenticated Routes */}
      <Route
        path={url.Dashboard}
        element={isAuthenticated ? <ProjectDashboard /> : <LoginMain />}
      />
      <Route
        path={url.WebsiteBuilder}
        element={isAuthenticated ? <WebsiteBuilder /> : <LoginMain />}
      />
      <Route
        path={url.Settings}
        element={isAuthenticated ? <SettingsPage /> : <LoginMain />}
      />

      {/* Profile Page Route */}
      <Route
        path={url.ProfilePage}
        element={isAuthenticated ? <MainLayout /> : <LoginMain />} // Show MainLayout for /profilepage
      />

      {/* Fallback Route */}
      <Route path="*" element={ <LoginMain />} />
      <Route path="/social" element={isAuthenticated ? <SocialMain/> : <LoginMain />} />
      <Route path="/chats" element={isAuthenticated ? <ChatTest /> : <LoginMain />}  />
    </Routes>
  );
};

export default App;
