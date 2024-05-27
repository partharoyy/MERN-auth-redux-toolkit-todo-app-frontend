import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todo.js';

export const store = configureStore({
  reducer: todoReducer,
});
