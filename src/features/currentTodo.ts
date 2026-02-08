import { User } from './../types/User';
import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export type CurrentTodoType = {
  todo: Todo;
  user?: User;
} | null;

const initialState: CurrentTodoType = null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    addCurrentTodo: (state, action) => {
      return action.payload;
    },
    removeCurrentTodo: () => {
      return null;
    },
  },
});

export default currentTodoSlice.reducer;
export const { addCurrentTodo, removeCurrentTodo } = currentTodoSlice.actions;
