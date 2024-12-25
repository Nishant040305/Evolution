import { socket } from "../scripts/socket";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateIconChat } from "../Store/Chat";
export const useSocketGroupChatIcon = () => {
  const dispatch = useDispatch();
  const x = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.userInfo);
  useEffect(() => {
    if(!x) return;
    socket.on("groupChatIcon", ({chatId,groupIcon}) => {
        console.log("this is here",chatId,groupIcon);
      dispatch(updateIconChat({chatId,icon:groupIcon}));
    });
    return () => {
      socket.off("groupChatName");
    };
  }, [user,x,socket,dispatch]);
}; 
