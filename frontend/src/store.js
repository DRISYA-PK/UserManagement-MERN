import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';

const persistedAuth = localStorage.getItem('auth') 
  ? JSON.parse(localStorage.getItem('auth'))
  : { token: null, role: null };


export default configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {   
    auth: persistedAuth, 
  },
});