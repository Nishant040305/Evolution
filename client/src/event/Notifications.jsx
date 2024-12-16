import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../scripts/socket';
import { addNotification, markAsRead, deleteNotification } from '../Store/Notifications';

export const useSocketNotifications = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const notifications = useSelector((state) => state.notifications);

  useEffect(() => {
    if(!isAuthenticated) return;
    // Listen for 'newNotification' event and handle adding the new notification
    const newNotificationSocket = socket.on('newNotification', (notification) => {
      // Add the new notification to the state
      dispatch(addNotification(notification));
    });

    // Listen for 'markNotificationAsRead' event and mark it as read in the state
    const markAsReadSocket = socket.on('markNotificationAsRead', (notificationId) => {
      // Mark the notification as read
      dispatch(markAsRead({ id: notificationId }));
    });

    // Listen for 'deleteNotification' event and remove the notification from the state
    const deleteNotificationSocket = socket.on('deleteNotification', (notificationId) => {
      // Delete the notification from the state
      dispatch(deleteNotification({ id: notificationId }));
    });

    // Cleanup the socket listeners on component unmount
    return () => {
      newNotificationSocket.off('newNotification');
      markAsReadSocket.off('markNotificationAsRead');
      deleteNotificationSocket.off('deleteNotification');
    };
  }, [dispatch]);

  // Optionally, return the current notifications for usage in the component
};
