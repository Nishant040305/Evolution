import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {socket} from '../scripts/socket';
import { markChatAsRead } from '../Store/Chat';
export const useSocketMarkAsRead = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.userInfo);
  const presentChat = useSelector((state) => state.chat.presentChat);
  const message = useSelector((state) => state.chat.message);
  const chat = useSelector((state) => state.chat.chats);
  useEffect(() => {
    if(!isAuthenticated) return;
    const userId = user._id;
    if (chat.length > 0 && presentChat && chat.find(chat => chat.chat_id === presentChat).unread_messages[userId] > 0) {
      socket.emit('markAsRead', { presentChat, userId });
      dispatch(markChatAsRead({ presentChat, userId }));
    }
    return () => {
      socket.off('markAsRead');
    };
  },[presentChat, user,message]);
  
};