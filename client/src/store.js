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
  whitelist: ['mode'], // Only persist the theme mode, excluding user
};

const userPersistConfig = {
  key: 'user',
  storage,
  version: 1, // This will help with migrations
  whitelist: ['isAuthenticated', 'userInfo'], // Only persist necessary parts of the state
};

// Root reducer with undoable functionality for web elements
const rootReducer = combineReducers({
  webElement: undoable(webElementsSlice), // Undoable reducer (not persisted)
  user: persistReducer(userPersistConfig, userReducer), // Apply persist for user slice
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
persistor.flush().then(() => {
  console.log('Persisted store loaded');
});
