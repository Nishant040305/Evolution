import { useDispatch, useSelector } from "react-redux";
import { socket } from "../scripts/socket";
import { deleteMessage } from "../Store/Chat";
import { useEffect } from "react";

export const useSocketDeleteMessage = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  const chat = useSelector((state) => state.chat.chats);
  const message = useSelector((state) => state.chat.messages);
  useEffect(() => {
    if (!isAuthenticated) return;  // Early return if user isn't authenticated
    
    const handleDeleteMessage = ({ chatId, messageId }) => {
      // Check if the chat and message exist
      const currentChat = chat.find(c => c.chat_id === chatId);
      if (!currentChat) return;
      const messageExists = message[chatId].some(msg => msg._id === messageId);
      if (messageExists) {
        dispatch(deleteMessage({ chatId, messageId }));
      }
    };

    socket.on('deleteMessage',({ chatId, messageId }) => {
      handleDeleteMessage({ chatId, messageId });
    });
    
    return () => {
      socket.off('deleteMessage');
    };
  }, [isAuthenticated,user, chat, dispatch]);  // Re-run when these values change
};
