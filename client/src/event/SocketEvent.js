import { socket } from '../scripts/socket';

/**
 * Emit an event to delete a message in a chat.
 * @param {string} chatId - The ID of the chat from which the message should be deleted.
 * @param {string} messageId - The ID of the message to delete.
 */
export const SocketDeleteMessage = (chatId, messageId) => {
    socket.emit('deleteMessage', { chatId, messageId });
};

/**
 * Emit an event to mark messages in a chat as read.
 * @param {string} chatId - The ID of the chat in which messages are being marked as read.
 * @param {string} userId - The ID of the user marking the messages as read.
 */
export const SocketMarkAsRead = (chatId, userId) => {
    socket.emit('markAsRead', { chatId, userId });
};

/**
 * Emit an event to send a message in a chat.
 * @param {string} chatId - The ID of the chat where the message is being sent.
 * @param {string} senderId - The ID of the user sending the message.
 * @param {string} content - The content of the message being sent.
 * @param {string} type - The type of message (e.g., "text", "image", "file").
 */
export const SocketSendMessage = (chatId, senderId, content, type) => {
    socket.emit('sendMessage', { chatId, senderId, content, type });
};

/**
 * Emit an event to send a general notification to a user.
 * @param {string} receiverId - The ID of the user receiving the notification.
 * @param {string} title - The title of the notification.
 * @param {string} type - The type of notification (e.g., "information", "friendRequest").
 * @param {Object} message - The message content (structure varies based on type).
 */
export const SocketSendNotification = (receiverId, title, type, message) => {
    socket.emit('sendNotification', { receiverId, title, type, message });
};

/**
 * Emit an event to send a friend request notification.
 * @param {string} senderId - The ID of the user sending the friend request.
 * @param {string} receiverId - The ID of the user receiving the friend request.
 * @param {string} title - The title of the notification (default: "Friend Request").
 */
export const SocketSendFriendRequest = (senderId, receiverId, title = "Friend Request") => {
    socket.emit('sendFriendRequest', { senderId, receiverId, title });
};

/**
 * Emit an event to mark a specific notification as read.
 * @param {string} notificationId - The ID of the notification to mark as read.
 * @param {string} userId - The ID of the user marking the notification as read.
 */
export const SocketMarkNotificationAsRead = (notificationId, userId) => {
    socket.emit('markNotificationAsRead', { notificationId, userId });
};

/**
 * Emit an event to accept a friend request.
 * @param {string} notificationId - The ID of the friend request notification to accept.
 */
export const SocketAcceptFriendRequest = (notificationId) => {
    socket.emit('acceptFriendRequest', { notificationId });
};

/**
 * Emit an event to decline a friend request.
 * @param {string} notificationId - The ID of the friend request notification to decline.
 */
export const SocketDeclineFriendRequest = (notificationId) => {
    socket.emit('declineFriendRequest', { notificationId });
};  
