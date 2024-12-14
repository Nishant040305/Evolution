import {socket} from '../scripts/socket';

export const SocketDeleteMessage = (chatId,messageId) => {
    socket.emit('deleteMessage', { chatId, messageId });
};
export const SocketMarkAsRead = (chatId,userId) => {
    socket.emit('markAsRead', { chatId, userId });
};
export const SocketSendMessage = (chatId,senderId,content,type) => {
    socket.emit('sendMessage', { chatId, senderId, content, type });
};