import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Uses localStorage
import undoable from 'redux-undo';
import webElementsSlice from './Store/webElementSlice';
import userReducer from './Store/userSlice';
import ImageSlice from './Store/imageSlice';
import projectSlice from './Store/projectSlice';
import ChatSlice from './Store/Chat';
import organizationSlice from './Store/Organization';
import NotificationSlice from './Store/Notifications';
import darkLightSlice from './Store/darkLightMode';

// ✅ Configure Persistence for Select Reducers
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'mode'], // Persist only authentication and theme mode
};

// Root reducer with undoable functionality for web elements
const rootReducer = combineReducers({
  webElement: undoable(webElementsSlice), // Undoable reducer (not persisted)
  user: userReducer, // Persist user authentication
  image: ImageSlice,
  project: projectSlice,
  chat: ChatSlice,
  notifications: NotificationSlice,
  organization: organizationSlice,
  mode: darkLightSlice, // Persist dark/light mode
});

// Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Configure Store with Middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable checks for non-serializable data
    }),
});

// ✅ Persistor for Rehydration
export const persistor = persistStore(store);
