// todoSlice.js

import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [{ id: nanoid(), text: "Hello world" }],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

      //? Added update todo functionality so the user can also update the todos.
    updateTodo: (state, action) => {
      const updatedTodo = action.payload;
      const todoToUpdate = state.todos.find(
        (todo) => todo.id === updatedTodo.id
      );
      if (todoToUpdate) {
        todoToUpdate.text = updatedTodo.text;
      }
    },
  },
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
