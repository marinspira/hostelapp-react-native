import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { PersistPartial } from 'redux-persist/es/persistReducer';
import guestReducer from './slices/guest';
import staffReducer from './slices/staff';
import userReducer from './slices/user';
import themeReducer from './slices/theme';
import hostelGuestsReducer from './slices/hostelGuests';
import hostelReducer from './slices/hostel';
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
    theme: themeReducer,
    hostelGuests: hostelGuestsReducer,
    hostel: hostelReducer,
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

export type RootState = ReturnType<typeof rootReducer> & PersistPartial;
export type AppDispatch = typeof store.dispatch;