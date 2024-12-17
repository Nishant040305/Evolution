import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotifications } from '../Store/Notifications';
import Chats from '../scripts/API.Chats';
const LoadNotifications = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.userInfo);
  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchNotifications = async () => {
      try {
        const API = new Chats(user._id);
        const data = await API.getNotifications();
        dispatch(setNotifications(data.data));
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [isAuthenticated,user]);


};

export default LoadNotifications;