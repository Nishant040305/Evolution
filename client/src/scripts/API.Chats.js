import axios from "axios";
import server from "../server.json";

class Chats {
    /**
     * Constructor for Chats class.
     * @param {string} id - The ID of the user using the chat system.
     */
    constructor(id) {
        this.id = id;
        this.baseURL = import.meta.env.VITE_REACT_APP_BACKWEB; // Base URL for API requests
    }

    /**
     * Retrieve all chats data for the user.
     * @returns {Promise<Object>} - Returns the chats data for the user.
     * @throws {Error} - Throws an error if the request fails.
     */
    async getChatsData() {
        try {
            let endpoint = `${this.baseURL}${server.Chat.getChatsData}`;
            const response = await axios.get(endpoint);
            return response.data;
        } catch (error) {
            console.error("Failed to retrieve chat data:", error);
            throw error;
        }
    }

    /**
     * Create a private chat between the current user and another user.
     * @param {string} secondUserId - The ID of the other user to start a chat with.
     * @returns {Promise<Object>} - Returns the created chat data.
     * @throws {Error} - Throws an error if the request fails.
     */
    async createChat(secondUserId) {
        try {
            conole.log("Creating chat with:",secondUserId);
            let endpoint = `${this.baseURL}${server.Chat.createChat}`;
            const response = await axios.post(endpoint, { secondUserId });
            return response.data;
        } catch (error) {
            console.error("Failed to create chat:", error);
            throw error;
        }
    }

    /**
     * Create a group chat.
     * @param {string} chatName - The name of the group chat.
     * @param {Array<string>} users - Array of user IDs to include in the group chat.
     * @param {string} groupImage - URL for the group chat image. Defaults to a placeholder.
     * @returns {Promise<Object>} - Returns the created group chat data.
     * @throws {Error} - Throws an error if the request fails.
     */
    async createGroupChat(chatName, users, groupImage = 'https://res.cloudinary.com/dwj0nj7d6/image/upload/v1731223362/Evolution/sp9gkw5kn8sjxvhju7aq.png') {
        try {
            let endpoint = `${this.baseURL}${server.Chat.createGroupChat}`;
            const response = await axios.post(endpoint, { chatName, users, groupImage });
            return response.data;
        } catch (error) {
            console.error("Failed to create group chat:", error);
            throw error;
        }
    }

    /**
     * Add a user to an existing group chat.
     * @param {string} chatId - The ID of the group chat.
     * @param {string} userId - The ID of the user to add to the group.
     * @returns {Promise<Object>} - Returns the updated group chat data.
     * @throws {Error} - Throws an error if the request fails.
     */
    async addUserToGroupChat(chatId, userIds) {
        try {
            let endpoint = `${this.baseURL}${server.Chat.addUserToGroupChat}`;
            
            const response = await axios.post(endpoint, { chatId, userIds });
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error("Failed to add user to group chat:", error);
            throw error;
        }
    }

    /**
     * Fetch messages from a chat.
     * @param {string} chatId - The ID of the chat to fetch messages from.
     * @param {Date|string} lastSeen - The timestamp of the last seen message (optional).
     * @returns {Promise<Object>} - Returns the chat messages data.
     * @throws {Error} - Throws an error if the request fails.
     */
    async getMessages(chatId, lastSeen) {
        try {
            let endpoint = `${this.baseURL}${server.Chat.getMessages}`;
            const response = await axios.post(endpoint, { chatId, lastSeen });
            return response.data;
        } catch (error) {
            console.error("Failed to fetch messages:", error);
            throw error;
        }
    }

    /**
     * Send a message in a chat.
     * @param {string} chatId - The ID of the chat to send the message to.
     * @param {string} message - The message content.
     * @returns {Promise<Object>} - Returns the message data after sending.
     * @throws {Error} - Throws an error if the request fails.
     */
    async sendMessage(chatId, message) {
        try {
            let endpoint = `${this.baseURL}${server.Chat.sendMessage}`;
            const response = await axios.post(endpoint, { chatId, message });
            return response.data;
        } catch (error) {
            console.error("Failed to send message:", error);
            throw error;
        }
    }

    // Notifications-Related APIs

    /**
     * Fetch notifications for the user.
     * @param {string} receiverId - The ID of the user to fetch notifications for.
     * @returns {Promise<Object>} - Returns the notifications data.
     * @throws {Error} - Throws an error if the request fails.
     */
    async getNotifications() {
        try {
            let endpoint = `${this.baseURL}${server.Notifications.getNotifications}`;
            const response = await axios.get(endpoint);
            return response.data;
        } catch (error) {
            console.error("Failed to retrieve notifications:", error);
            throw error;
        }
    }

    /**
     * Mark a specific notification as read.
     * @param {string} notificationId - The ID of the notification to mark as read.
     * @returns {Promise<Object>} - Returns the updated notification data.
     * @throws {Error} - Throws an error if the request fails.
     */
    async markNotificationAsRead(notificationId) {
        try {
            let endpoint = `${this.baseURL}${server.Notifications.markAsRead}`;
            const response = await axios.post(endpoint, { id: notificationId });
            return response.data;
        } catch (error) {
            console.error("Failed to mark notification as read:", error);
            throw error;
        }
    }

    /**
     * Delete a specific notification.
     * @param {string} notificationId - The ID of the notification to delete.
     * @returns {Promise<Object>} - Returns the deleted notification data.
     * @throws {Error} - Throws an error if the request fails.
     */
    async deleteNotification(notificationId) {
        try {
            let endpoint = `${this.baseURL}${server.Notifications.deleteNotification}`;
            const response = await axios.post(endpoint, { id: notificationId });
            return response.data;
        } catch (error) {
            console.error("Failed to delete notification:", error);
            throw error;
        }
    }

    /**
     * Send a friend request notification.
     * @param {string} senderId - The ID of the user sending the friend request.
     * @param {string} receiverId - The ID of the user receiving the friend request.
     * @param {string} title - The title of the notification (default: "Friend Request").
     * @returns {Promise<Object>} - Returns the created notification data.
     * @throws {Error} - Throws an error if the request fails.
     */
    async sendFriendRequest(senderId, receiverId, title = "Friend Request") {
        try {
            let endpoint = `${this.baseURL}${server.Notifications.sendFriendRequest}`;
            const response = await axios.post(endpoint, { message:senderId, receiverId, title,type:"friendRequest" });
            return response.data;
        } catch (error) {
            console.error("Failed to send friend request:", error);
            throw error;
        }
    }
    /**
     * Leave a group chat.
     * @param {string} chatId - The ID of the group chat to leave.
     * @returns {Promise<Object>} - Returns the updated chat data.
     * @throws {Error} - Throws an error if the request fails.
     */
    async leaveGroupChat(chatId) {
        try {
            let endpoint = `${this.baseURL}${server.Chat.leaveGroupChat}`;
            const response = await axios.post(endpoint, { chatId });
            return response.data;
        } catch (error) {
            console.error("Failed to leave group chat:", error);
            throw error;
        }
    }
    /**
     * Edit the name of a group chat.
     * @param {string} chatId - The ID of the group chat to edit.
     * @param {string} groupName - The new name for the group chat.
     * @returns {Promise<Object>} - Returns the updated group chat data.
     * @throws {Error} - Throws an error if the request fails.
     */
    async editGroupChatName(chatId, groupName) {
        try {
            let endpoint = `${this.baseURL}${server.Chat.editGroupChatName}`;
            const response = await axios.post(endpoint, { chatId, groupName });
            return response.data;
        } catch (error) {
            console.error("Failed to edit group chat name:", error);
            throw error;
        }
    }
    /**
     * Edit the icon of a group chat.
     * @param {string} chatId - The ID of the group chat to edit.
     * @param {string} groupImage - The new icon for the group chat.
     * @returns {Promise<Object>} - Returns the updated group chat data.
     * @throws {Error} - Throws an error if the request fails.
     */
    async editGroupChatIcon(chatId, groupImage) {
        try {
            console.log(groupImage);
            let endpoint = `${this.baseURL}${server.Chat.editGroupChatIcon}`;
            const response = await axios.post(endpoint, { chatId, groupImage });
            return response.data;
        } catch (error) {
            console.error("Failed to edit group chat icon:", error);
            throw error;
        }
    }   
     
}

export default Chats;
