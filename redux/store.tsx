import { configureStore } from '@reduxjs/toolkit'
import guestReducer from './slices/guest/slice'; 
import staffReducer from './slices/staff/slice'; 
import userReducer from './slices/user/slice'; 

const store = configureStore({
    reducer: {
        user: userReducer,
        guest: guestReducer,
        staff: staffReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store