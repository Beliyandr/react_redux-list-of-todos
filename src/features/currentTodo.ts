import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

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
