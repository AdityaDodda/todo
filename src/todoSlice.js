import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tasks: [],
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.tasks.push(action.payload)
    },
    updateTodo: (state, action) => {
      const index = state.tasks.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) {
        state.tasks[index] = action.payload
      }
    },
    delTodo: (state, action) => {
      state.tasks = state.tasks.filter((todo) => todo.id !== action.payload)
    },
  },
})

export const { addTodo, updateTodo, delTodo } = todoSlice.actions

export default todoSlice.reducer;