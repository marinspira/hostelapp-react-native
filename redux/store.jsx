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

export default store