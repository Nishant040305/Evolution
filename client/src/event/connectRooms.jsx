import { socket } from '../scripts/socket';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export const connectRooms = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (!isAuthenticated || !user) return;
    console.log(socket);
    if (!socket.connected) {
      socket.connect();
    }

    socket.emit('joinRoom', user._id);
    socket.on('joinRoom', (data) => {});
    socket.on('disconnect', () => {
      socket.connect();
    });

    return () => {
      socket.off('disconnect');
      socket.off('connect');
    };
  }, [isAuthenticated, user]);
};
