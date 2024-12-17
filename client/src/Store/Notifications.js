import { createSlice } from '@reduxjs/toolkit';

const NotificationsSlice = createSlice({
  name: 'notifications',
  initialState: [], // Initial state is an empty array
  reducers: {
    /**
     * Marks a notification as read by updating the `read` property to `true`.
     * @param {Object} state - The current state (notifications array).
     * @param {Object} action - The action payload contains the notification `id`.
     */
    markAsRead: (state, action) => {
      const { id } = action.payload;
      const notification = state.find((notification) => notification.id === id);
      if (notification) {
        notification.read = true; // Mark the notification as read
      }
    },

    /**
     * Deletes a notification by filtering out the notification with the given `id`.
     * @param {Object} state - The current state (notifications array).
     * @param {Object} action - The action payload contains the notification `id`.
     */
    deleteNotification: (state, action) => {
      const { id } = action.payload;
      const newState = state.filter((notification) => {
        return notification._id !== id; // Remove the matching notification
      });
      return newState; // Return the updated state
    },

    /**
     * Adds a new notification to the notifications list.
     * @param {Object} state - The current state (notifications array).
     * @param {Object} action - The action payload contains the new notification object.
     */
    addNotification: (state, action) => {
      state.push(action.payload); // Add new notification to the array
    },
    /**
     * Set the notifications array
     * @param {Object} state - The current state (notifications array).
     * @param {Object} action - The action payload contains the new notification object.
     */
    setNotifications: (state, action) => {
      return action.payload;
    },  
  
  },
});

// Exporting actions for use in components or other parts of the app
export const { markAsRead, deleteNotification, addNotification,setNotifications } = NotificationsSlice.actions;

// Exporting the reducer to be included in the store
export default NotificationsSlice.reducer;
