import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotifications } from '../Store/Notifications';
import Chats from '../scripts/API.Chats';
import { set } from 'date-fns';
export const LoadNotifications = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.userInfo);
  const [mounted, setMounted] = useState(false);
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
    if (mounted) {
      fetchNotifications();
    } else {
      setMounted(true);
    }
  }, [isAuthenticated, user, mounted]);
};
