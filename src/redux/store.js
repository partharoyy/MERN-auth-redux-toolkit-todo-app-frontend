import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todo.js';
import authReducer from './slices/auth.js';

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    auth: authReducer,
  },
});
