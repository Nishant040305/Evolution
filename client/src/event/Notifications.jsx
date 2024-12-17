import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../scripts/socket';
import { addNotification, markAsRead, deleteNotification } from '../Store/Notifications';

export const useSocketNotifications = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.userInfo);
  useEffect(() => {
    if(!isAuthenticated) return;
    // Listen for 'newNotification' event and handle adding the new notification
    socket.on('newNotification', (notification) => {
      // Add the new notification to the state
      dispatch(addNotification(notification));
    });

    // Listen for 'markNotificationAsRead' event and mark it as read in the state
    socket.on('markNotificationAsRead', (notificationId) => {
      // Mark the notification as read
      dispatch(markAsRead({ id: notificationId }));
    });

    // Listen for 'deleteNotification' event and remove the notification from the state
    socket.on('deleteNotification', (notificationId) => {
      // Delete the notification from the state
      dispatch(deleteNotification({ id: notificationId }));
    });

    // Cleanup the socket listeners on component unmount
    return () => {
      socket.off('newNotification');
      socket.off('markNotificationAsRead'); 
      socket.off('deleteNotification');
    };
  }, [dispatch,socket,user,isAuthenticated]);

  // Optionally, return the current notifications for usage in the component
};
