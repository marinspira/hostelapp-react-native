import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/user/userSlice'; 
import staffReducer from './slices/user/staffSlice'; 

const store = configureStore({
    reducer: {
        user: userReducer,
        staff: staffReducer,
    }
})

export default store