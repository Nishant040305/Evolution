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
import HelmetWrapper from '../src/components/utility/HelmetWrapper';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user.userInfo);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      dispatch(verifyUser());
      setMounted(true);
    } else {
      if (!isAuthenticated) dispatch(verifyUser());
    }
  }, [isAuthenticated, user, mounted]);

  MainPageHook();

  return (
    <Routes>
      <Route
        path={url.LandingPage}
        element={
          <HelmetWrapper
            title="Home"
            description="Explore the future of digital innovation with Evolution DNA."
            path="/"
          >
            {isAuthenticated ? <ProjectDashboard /> : <LandingPage />}
          </HelmetWrapper>
        }
      />
      <Route
        path={url.SocialMain}
        element={
          <HelmetWrapper
            title="Social"
            description="Engage with the Evolution DNA social experience and connect with your team."
            path="/social"
          >
            {isAuthenticated ? <SocialMain /> : <LoginMain />}
          </HelmetWrapper>
        }
      />
      <Route
        path={url.Login}
        element={
          <HelmetWrapper
            title="Login"
            description="Sign in to your Evolution DNA account and unlock digital tools tailored for you."
            path="/login"
          >
            <LoginMain />
          </HelmetWrapper>
        }
      />
      <Route
        path={url.Dashboard}
        element={
          <HelmetWrapper
            title="Dashboard"
            description="Access your personalized Evolution DNA dashboard and manage your projects efficiently."
            path="/dashboard"
          >
            {isAuthenticated ? <ProjectDashboard /> : <LoginMain />}
          </HelmetWrapper>
        }
      />
      <Route
        path={url.WebsiteBuilder}
        element={
          <HelmetWrapper
            title="Website Builder"
            description="Create and customize your website with Evolution DNA's powerful builder tools."
            path="/builder"
          >
            {isAuthenticated ? <WebsiteBuilder /> : <LoginMain />}
          </HelmetWrapper>
        }
      />
      <Route
        path={url.Settings}
        element={
          <HelmetWrapper
            title="Settings"
            description="Update your preferences, privacy, and account configuration on Evolution DNA."
            path="/settings"
          >
            {isAuthenticated ? <SettingsPage /> : <LoginMain />}
          </HelmetWrapper>
        }
      />
      <Route
        path={url.ProfilePage}
        element={
          <HelmetWrapper
            title="Profile"
            description="View and manage your Evolution DNA user profile and identity settings."
            path="/profilepage"
          >
            {isAuthenticated ? <ProfileView /> : <LoginMain />}
          </HelmetWrapper>
        }
      />
      <Route
        path="*"
        element={
          <HelmetWrapper
            title="Redirecting"
            description="You're being redirected to your Evolution DNA experience."
            path="*"
          >
            {isAuthenticated ? <ProjectDashboard /> : <LoginMain />}
          </HelmetWrapper>
        }
      />
    </Routes>
  );
};

export default App;
