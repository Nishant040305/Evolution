import { io } from 'socket.io-client';

const URL = `${import.meta.env.VITE_REACT_APP_SOCKET}`;
// const max_socket_reconnects = 200;
export const socket = io(URL, {
  path: '/socket/',
  withCredentials: true,
  autoConnect: false, // Prevent auto-connect on import
  reconnection: true, // Enable automatic reconnection
  reconnectionAttempts: 10, // Retry connection
  reconnectionDelay: 2000, // Delay before reconnecting
  transports: ['websocket', 'polling'], // Use WebSocket transport
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
socket.on('connect_error', (err) => {
  // the reason of the error, for example "xhr poll error"
  console.log(err.message);

  // some additional description, for example the status code of the initial HTTP response
  console.log(err.description);

  // some additional context, for example the XMLHttpRequest object
  console.log(err.context);
});
// Handle disconnection
socket.on('disconnect', () => {
  console.log('Disconnected from the server');
});
