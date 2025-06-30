import { createSlice } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isSuccess = true;
    },
    logoutSuccess: (state) => {
      state.user = null;
    },
  },
});

export const { reset, loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;