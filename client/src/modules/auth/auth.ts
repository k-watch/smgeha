import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  auth: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, { payload: auth }) {
      state.auth = JSON.parse(auth);
    },
    delAuth(state) {
      state.auth = null;
    },
  },
});

export const { setAuth, delAuth } = authSlice.actions;

export const authSelector = (state: any) => state.auth.auth;

export default authSlice.reducer;
