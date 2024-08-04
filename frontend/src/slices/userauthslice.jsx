// auth for  signin  page
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../firebase'; 

const auth = getAuth(app)

export const signIn = createAsyncThunk(
  'userAuth/signin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default userAuthSlice.reducer;
