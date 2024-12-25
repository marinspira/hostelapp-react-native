import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BackendResponse, ThunkArgs, User, UserState } from './interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

export const isAuthenticated = createAsyncThunk<BackendResponse, void, { rejectValue: string }>(
  'user/isAuthenticated',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/auth/isAuthenticated`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Failed to authenticate", errorDetails);
        throw new Error('Failed to send user data');
      }

      const user = await response.json();
      console.log('user do slice', user)
      return user as BackendResponse

    } catch (error) {
      console.error("Unexpected error occurred during authentication", error);
      return rejectWithValue((error as Error).message)
    }
  }
)

export const appleAuth = createAsyncThunk<BackendResponse, { identityToken: string; fullName: string; role: string }, { rejectValue: string }>(
  'user/appleAuth',
  async ({ identityToken, fullName, role }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/auth/appleLogin`, {
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

export const googleAuth = createAsyncThunk<BackendResponse, ThunkArgs, { rejectValue: string }>(
  'user/sendToBackend',
  async ({ user }, { rejectWithValue }) => {

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/auth/googleLogin`, {
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

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const errorData = await response.json();

        console.log(errorData)
        throw new Error(errorData.message || 'Logout failed');
      }

      const result = await response.json()

      console.log('resu', result)
      return result
      // return result as BackendResponse;

    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unexpected error occurred');
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
    resetUserState: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // isAuthenticated
      .addCase(isAuthenticated.pending, (state) => {
        state.loading = true;
      })
      .addCase(isAuthenticated.fulfilled, (state, action: PayloadAction<BackendResponse>) => {
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(isAuthenticated.rejected, (state, action) => {
        state.error = action.payload || 'Unknown error';
        state.loading = false;
      })
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
      })
      // logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.data = null;
        state.loading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An unexpected error occurred';
      });
  },
});

export const { resetUserState } = userSlice.actions;
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
