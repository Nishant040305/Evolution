import {configureStore,combineReducers} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    //add slices
})

export const store = configureStore({
    reducer:{
        
    }
})


// const persistConfig = {
//   key: 'root',
//   storage,
//   version: 1,
// }
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({ serializableCheck: false }),
// });

// export const persistor = persistStore(store);
