import { socket } from "../scripts/socket";
import { useSelector } from "react-redux";
import { useEffect } from "react";
export const connectRooms = () => {
  let x = useSelector((state) => state.user.isAuthenticated);
  let user = useSelector((state) => state.user.userInfo);
  // Connect to the socket
  useEffect(() => {
    if(!x) return;

  socket.connect();
  socket.emit("joinRoom", user._id);
  
  // Handle socket Reconnection
  socket.on("connect", () => {
    socket.emit("joinRoom", user._id);
    console.log("Socket connected");
  });
  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });
  return () => {
    socket.off("connect");
    socket.off("disconnect");
  };

}, [socket,user,x]);
};