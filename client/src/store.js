import { configureStore, combineReducers } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import undoable from 'redux-undo';
import webElementsSlice from './Store/webElementSlice'; // import your slice
import userReducer from './Store/userSlice';
import ImageSlice from './Store/imageSlice';
import projectSlice from './Store/projectSlice';
import ChatSlice from './Store/Chat';
import organizationSlice from './Store/Organization';
import NotificationSlice from './Store/Notifications';
// Root reducer with undo functionality for specific slices
const rootReducer = combineReducers({
  webElement: undoable(webElementsSlice),
  user: userReducer,
  image:ImageSlice,
  project:projectSlice,
  chat:ChatSlice,
  notifications: NotificationSlice,
  organization:organizationSlice,
});
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
// Clear storage for development
persistor.purge(); // This will clear the persisted state
  