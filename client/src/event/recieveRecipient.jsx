import { socket } from "../scripts/socket";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateReadUser } from "../Store/Chat";
export const useSocketUserReadReceipts = () => {
  const dispatch = useDispatch();
  const x = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.userInfo);
  useEffect(() => {
    // Listen for the "receiveMessage" event from the server
    if(!x) return;
    socket.on("readReceipts", ({ chatId,userId  }) => {
      dispatch(updateReadUser({ chatId, userId: userId }));
    });
    return () => {
      socket.off("readReceipts");
    };
  }, [socket]);
};