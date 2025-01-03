import {createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    todos: [{id: 1, text: "Hello world"}],
    update: undefined
}



export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
      addTodo: (state, action) => {
        const todo = {
          id: nanoid(),
          text: action.payload
        };
        state.todos.push(todo);
      },
      removeTodo: (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      },
      setUpdate: (state, action) => {
        state.update = action.payload; // Set the ID of the todo to update
      },
      updateTodo: (state, action) => {
        state.todos = state.todos.map(todo => {
          if (todo.id === state.update.id) {
            return {
              ...todo,
              text: action.payload,
            };
          }
          return todo;
        });
        state.update = undefined; // Reset after updating
      }
    }
  });
  
  export const { addTodo, removeTodo, setUpdate, updateTodo } = todoSlice.actions;
  
  export default todoSlice.reducer;
  