import { socket } from "../scripts/socket";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateNameChat } from "../Store/Chat";
export const useSocketGroupChatName = () => {
  const dispatch = useDispatch();
  const x = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.userInfo);
  useEffect(() => {
    if(!x) return;
    socket.on("groupChatName", ({chatId,groupName}) => {
        console.log("this is here",chatId,groupName);
      dispatch(updateNameChat({chatId,name:groupName}));
    });
    return () => {
      socket.off("groupChatName");
    };
  }, [user,x,socket,dispatch]);
}; 
