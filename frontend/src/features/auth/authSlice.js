import { createSlice } from '@reduxjs/toolkit';


const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null, role: null, user: null },
  reducers: {
    setAuth: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.user = null;
    },
  },
});

export const { setAuth, setUser, logout } = authSlice.actions;
export default authSlice.reducer;