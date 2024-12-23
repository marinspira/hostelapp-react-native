import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BackendResponse, ThunkArgs, User, UserState } from './interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

export const appleAuth = createAsyncThunk<BackendResponse, { identityToken: string; fullName: string; role: string }, { rejectValue: string }>(
  'user/appleAuth',
  async ({ identityToken, fullName, role }, { rejectWithValue }) => {

    try {
      const response = await fetch('https://7ad3-94-119-32-13.ngrok-free.app/api/auth/appleLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identityToken, fullName, role })
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Failed to login:", errorDetails);
        throw new Error('Failed to send user data');
      }

      const user = await response.json();

      // Redirecionar com base nos dados do usuário
      if (user.isNewUser) {
        router.push(user.role === 'guest' ? '/guest/(screens)/checkin' : '/host/register');
      } else {
        router.push(user.role === 'guest' ? '/guest/(tabs)' : '/host/(tabs)');
      }

      return user as BackendResponse;

    } catch (error) {
      console.error('Erro em appleAuth:', error);
      return rejectWithValue((error as Error).message);
    }
  }
);


// Thunk para enviar os dados do usuário ao backend
export const googleAuth = createAsyncThunk<BackendResponse, ThunkArgs, { rejectValue: string }>(
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
      console.error("Error in googleAuth:", error);
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
      // googleAuth
      .addCase(googleAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleAuth.fulfilled, (state, action: PayloadAction<BackendResponse>) => {
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.error = action.payload || 'Unknown error';
        state.loading = false;
      })
      // appleAuth
      .addCase(appleAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(appleAuth.fulfilled, (state, action: PayloadAction<BackendResponse>) => {
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(appleAuth.rejected, (state, action) => {
        state.error = action.payload || 'Unknown error';
        state.loading = false;
      });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
