import React, { useState, useEffect } from 'react';
import ProfilePage from '../pages/Profile_Page';
import url from '../url.json';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LeftSocialSideBar from '../components/Navigation/leftSocialSideBar';
import User from '../scripts/API.User';
const ProfileView = () => {
  const [state, setState] = useState('Profile');
  const id = useParams();
  const navigate = useNavigate();
  const API = new User();
  const [profile, setProfile] = useState(false);
  useEffect(() => {
    sessionStorage.setItem('state', state);
  }, [state]);
  useEffect(() => {
    if (state === 'Back') {
      navigate('/');
    } else if (state !== 'Profile') {
      sessionStorage.setItem('state', 'Profile');
      navigate(url.SocialMain);
    }
  }, [state]);
  useEffect(() => {
    const getProfile = async () => {
      const response = await API.getProfile(id.id);
      setProfile(response);
      if (response == null) {
        navigate(url.SocialMain);
      }
    };
    getProfile();
  }, [id]);
  return (
    <div className="social-main flex flex-row">
      <ToastContainer />
      <LeftSocialSideBar setNav={setState} />
      {profile && <ProfilePage profile={profile} status={false} />}
    </div>
  );
};
export default ProfileView;
