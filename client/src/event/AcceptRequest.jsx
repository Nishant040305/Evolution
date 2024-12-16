import { socket } from "../scripts/socket";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addChat, updateReadUser } from "../Store/Chat";
import { connectRooms } from "./connectRooms";
export const useSocketAcceptFriendRequest = () => {
  const dispatch = useDispatch();
  const x = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.userInfo);
  useEffect(() => {
    
    if(!x) return;
    socket.on("acceptFriendRequest", (chat) => {
      dispatch(addChat(chat));
    });
    return () => {
      socket.off("acceptFriendRequest");
    };
  }, [user,x,socket,dispatch]);
  connectRooms();
}; 