import { io } from 'socket.io-client';

const URL = `${import.meta.env.VITE_REACT_APP_SOCKET}`;
// const max_socket_reconnects = 200;
export const socket = io(URL, {
  withCredentials: true,
  autoConnect: false, // Prevent auto-connect on import
  reconnection: true, // Enable automatic reconnection
  reconnectionAttempts: 10, // Retry connection
  reconnectionDelay: 2000, // Delay before reconnecting
  transports: ['websocket'], // Use WebSocket transport
});

// Listen for heartbeat messages
socket.on('heartbeat', (data) => {
  console.log('Heartbeat received:', data.message);
  // Respond to the heartbeat
  socket.emit('heartbeat', { message: 'ping' });
});

// Handle reconnections
socket.on('connect', () => {
  console.log('Reconnected to the server');
});

// Handle disconnection
socket.on('disconnect', () => {
  console.log('Disconnected from the server');
});
