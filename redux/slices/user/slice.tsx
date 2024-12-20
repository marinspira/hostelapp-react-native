import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BackendResponse, ThunkArgs, User, UserState } from './interfaces';

const initialState: UserState = {
  user: null,
  role: null,
  loading: false,
  error: null,
};

// Thunk para enviar os dados do usuário ao backend
// export const sendUserToBackend = createAsyncThunk<BackendResponse, ThunkArgs, { rejectValue: string }>
//   ('user/sendToBackend', async ({ user, role }, { rejectWithValue }) => {

//     try {

//       const response = await fetch('https://your-backend-url.com/api/user', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ...user, role }),
//       });

//       if (!response.ok) throw new Error('Failed to send user data');
//       return (await response.json()) as BackendResponse;

//     } catch (error) {
//       return rejectWithValue((error as Error).message);
//     }

//   });

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(sendUserToBackend.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(sendUserToBackend.fulfilled, (state, action: PayloadAction<BackendResponse>) => {
  //       state.user = action.payload.data;
  //       state.loading = false;
  //     })
  //     .addCase(sendUserToBackend.rejected, (state, action) => {
  //       state.error = action.payload || 'Unknown error';
  //       state.loading = false;
  //     });
  // },
});

export const { setUser, setRole } = userSlice.actions;
export default userSlice.reducer;
