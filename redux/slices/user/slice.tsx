import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BackendResponse, User, UserState } from './interfaces';
import { router } from 'expo-router';
import { showToast } from '@/components/toast';

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
        credentials: 'include',
      });

      // Verifica se a resposta está OK antes de tentar processar
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

      // Verifica se a resposta contém JSON antes de tentar fazer o parsing
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Unexpected response format", contentType);
        return rejectWithValue("Unexpected response format");
      }

      const user = await response.json();
      console.log(user);

      showToast({
        type: user.success === true ? 'success' : 'error',
        title: 'Login',
        message: user.message,
      });

      return user as BackendResponse;

    } catch (error) {
      console.error("Unexpected error occurred during authentication", error);
      return rejectWithValue("Unexpected error occurred");
    }
  }
);

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
        console.error("Failed to login", response.status, errorDetails);
        return rejectWithValue("Failed to login");
      }

      const user = await response.json();

      if (user.data.isNewUser) {
        router.push(user.data.role === 'guest' ? '/guest/(screens)/checkin' : '/host/register');
      } else {
        router.push(user.data.role === 'guest' ? '/guest/(tabs)' : '/host/(tabs)');
      }

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
    console.log(token)
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/auth/googleLogin`, {
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

      if (user.data.isNewUser) {
        router.push(user.data.role === 'guest' ? '/guest/checkin' : '/host/register');
      } else {
        router.push(user.data.role === 'guest' ? '/guest/(tabs)' : '/host/(tabs)');
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
  async (_, { rejectWithValue }) => {
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

      router.push('/public')

      showToast({
        type: 'error',
        title: 'Logout succefully',
        message: '',
      });

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
export const { updateUserField } = userSlice.actions;
export default userSlice.reducer;
