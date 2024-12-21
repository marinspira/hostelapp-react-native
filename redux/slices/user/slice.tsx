import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BackendResponse, ThunkArgs, User, UserState } from './interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

// Thunk para enviar os dados do usuário ao backend
export const sendUserToBackend = createAsyncThunk<BackendResponse, ThunkArgs, { rejectValue: string }>(
  'user/sendToBackend',
  async ({ user }, { rejectWithValue }) => {

    try {
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...user }),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Failed to login:", errorDetails);
        throw new Error('Failed to send user data');
      }

      const data = await response.json();
      console.log(data)

      // Save to AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(user));

      // Redirect based on user state and role
      if (data.isNewUser) {
        router.push(data.role === 'guest' ? '/guest/checkin' : '/host/register');
      } else {
        router.push(data.role === 'guest' ? '/guest/(tabs)' : '/host/(tabs)');
      }

      return data as BackendResponse;
    } catch (error) {
      console.error("Error in sendUserToBackend:", error);
      return rejectWithValue((error as Error).message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendUserToBackend.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendUserToBackend.fulfilled, (state, action: PayloadAction<BackendResponse>) => {
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(sendUserToBackend.rejected, (state, action) => {
        state.error = action.payload || 'Unknown error';
        state.loading = false;
      });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
