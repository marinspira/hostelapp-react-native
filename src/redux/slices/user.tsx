import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from '../../interfaces/user';
import { router } from 'expo-router';
import { showToast } from '@/src/components/toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetAppState } from '@/src/redux/globalActions';
import { BackendResponse } from '@/src/interfaces/backendResponse';

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

export const isAuthenticated = createAsyncThunk<BackendResponse, void, { rejectValue: string }>(
  'user/isAuthenticated',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/auth/is-authenticated`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 401) {
          return rejectWithValue('Login to continue');
        }
        if (response.status === 404) {
          showToast({
            type: 'error',
            title: 'Server desconnected',
            message: 'Please contact the suport.',
          });
          return rejectWithValue('Server desconnected');
        }
        console.error("Failed to authenticate", response.status, response.statusText);
        return rejectWithValue('Failed to authenticate');
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Unexpected response format", contentType);
        return rejectWithValue("Unexpected response format");
      }

      const user = await response.json();
      return user as BackendResponse;
    } catch (error) {
      console.error("Unexpected error occurred during authentication", error);
      return rejectWithValue("Unexpected error occurred");
    }
  }
);

export const localhostAuth = createAsyncThunk<BackendResponse, { credentials: any, role: string }, { rejectValue: string }>(
  'user/localhostAuth',
  async ({ credentials, role }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credentials, role })
      })


      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Failed to login", response.status, errorDetails);
        return rejectWithValue("Failed to login");
      }

      const user = await response.json();

      if (!user || !user.data) {
        console.error("Usuário inválido recebido:", user);
        return rejectWithValue("Usuário inválido");
      }

      return user as BackendResponse;

    } catch (error) {
      console.error('Erro em localhostAuth:', error);
      return rejectWithValue((error as Error).message);
    }
  }
)

export const appleAuth = createAsyncThunk<BackendResponse, { identityToken: string; fullName: string; role: string }, { rejectValue: string }>(
  'user/appleAuth',
  async ({ identityToken, fullName, role }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/auth/apple`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identityToken, fullName, role })
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Failed to login", response.status, errorDetails);
        return rejectWithValue("Failed to login");
      }

      const user = await response.json();

      return user as BackendResponse;

    } catch (error) {
      console.error('Erro em appleAuth:', error);
      return rejectWithValue((error as Error).message);
    }
  }
);

export const googleAuth = createAsyncThunk<BackendResponse, { token: string, role: string }, { rejectValue: string }>(
  'user/sendToBackend',
  async ({ token, role }, { rejectWithValue }) => {

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, role }),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error("Failed to login:", errorDetails);
        throw new Error('Failed to send user data');
      }

      const user = await response.json();

      if (!user || !user.data) {
        console.error("Usuário inválido recebido:", user);
        return rejectWithValue("Usuário inválido");
      }

      return user as BackendResponse;

    } catch (error) {
      console.error("Error in googleAuth:", error);
      return rejectWithValue((error as Error).message);
    }
  }
);

export const logout = createAsyncThunk<BackendResponse, void, { rejectValue: string }>(
  'user/logout',
  async (_, { dispatch, rejectWithValue }) => {

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Logout failed');
      }

      const result = await response.json()
      await AsyncStorage.clear();
      // persistStore(store).purge();

      dispatch(resetAppState());

      showToast({
        type: 'success',
        title: 'Logout succefully',
        message: '',
      });

      router.push('/public')

      return result as BackendResponse;

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
    updateUserField: (state, action: PayloadAction<{ key: keyof User; value: any }>) => {
      if (state.data) {
        state.data[action.payload.key] = action.payload.value;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // resetAppState
      .addCase(resetAppState, () => initialState)
      // isAuthenticated
      .addCase(isAuthenticated.pending, (state) => {
        state.loading = true;
      })
      .addCase(isAuthenticated.fulfilled, (state, action: PayloadAction<BackendResponse>) => {
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(isAuthenticated.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
      })
      // localhostAuth
      .addCase(localhostAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(localhostAuth.fulfilled, (state, action: PayloadAction<BackendResponse>) => {
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(localhostAuth.rejected, (state, action) => {
        state.data = null;
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
        // state.data = null;
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
export const { updateUserField } = userSlice.actions;
export default userSlice.reducer;
