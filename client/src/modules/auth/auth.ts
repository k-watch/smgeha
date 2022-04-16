import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  auth: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, { payload: auth }) {
      return JSON.parse(auth);
    },
  },
});

export const { setAuth } = authSlice.actions;

export const authSelector = (state: any) => state.auth;

export default authSlice.reducer;
