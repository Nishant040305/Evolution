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

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(verifyUser());
  }, [dispatch]);

  return (
    <Routes>
      {/* Landing Page */}
      <Route path={url.LandingPage} element={<LandingPage />} />

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
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
};

export default App;
