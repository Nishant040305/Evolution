import { socket } from "../scripts/socket";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../Store/Chat"; // Assuming you're using Redux to manage messages
import { useEffect } from "react";
export const useSocketRecieveMessage = () => {
  const dispatch = useDispatch();
  const x = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.userInfo);
  useEffect(() => {
    // Listen for the "receiveMessage" event from the server
    if(!x) return;
    socket.on("receiveMessage", (newMessage) => {
      // Assuming newMessage contains the message data like { chat_id, sender_id, content, type, timestamp }
      console.log(newMessage.content);
      // Dispatch the action to update the Redux store with the new message
      dispatch(addMessage({
        chatId: newMessage.chat_id, // Assuming this field exists in the message object
        messages: newMessage, // You can customize this part to append to existing messages,
        userId: user._id
      }));

      // Optionally log the message or perform other actions
      console.log('New message received:', newMessage);
    });

    // Cleanup listener when the component unmounts
    return () => {
      socket.off("receiveMessage");
    };
  }, [dispatch,socket,user]);
};
