import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import url from './url.json';
import LoginMain from './container/LoginMain';
import WebsiteBuilder from './container/WebsiteBuilder';
import ProjectDashboard from './container/ProjectDashboard';
import { verifyUser } from './Store/userSlice';
import SettingsPage from './components/Dashboard/SettingsPage';
import LandingPage from './pages/Landing_Page';
import ProfileView from './container/profileView';
import SocialMain from './container/SocialMain';
import { MainPageHook } from './hooks/MainPageHook';
const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user.userInfo);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!isAuthenticated) dispatch(verifyUser());
  }, [isAuthenticated, user]);
  MainPageHook();
  return (
    <Routes>
      {/* Landing Page */}
      <Route
        path={url.LandingPage}
        element={isAuthenticated ? <ProjectDashboard /> : <LandingPage />}
      />
      <Route
        path={url.SocialMain}
        element={isAuthenticated ? <SocialMain /> : <LoginMain />}
      />
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
        element={isAuthenticated ? <ProfileView /> : <LoginMain />} // Show MainLayout for /profilepage
      />

      {/* Fallback Route */}
      <Route
        path="*"
        element={isAuthenticated ? <ProjectDashboard /> : <LoginMain />}
      />
    </Routes>
  );
};

export default App;
