import { combineReducers, configureStore } from '@reduxjs/toolkit'
import guestReducer from './slices/guest/slice';
import staffReducer from './slices/staff/slice';
import userReducer from './slices/user/slice';
import themeReducer from './slices/theme/slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [
        'user',
        'guest',
        'theme'
    ],
};

const rootReducer = combineReducers({
    user: userReducer,
    guest: guestReducer,
    staff: staffReducer,
    theme: themeReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;