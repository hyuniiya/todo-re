import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import nextId from "react-id-generator";

import { waitTwoSeconds } from "../../utils";

export const __addToDo = createAsyncThunk(
  "__addToDo",
  async (payload, thunkAPI) => {
    await waitTwoSeconds();
    const { title, body } = payload;
    const newTodo = {
      id: nextId(),
      title,
      body,
    };
    thunkAPI.dispatch(addTodo(newTodo));
  }
);

export const __deleteTodo = createAsyncThunk(
  "__deleteToDo",
  async (id, thunkAPI) => {
    await waitTwoSeconds();
    thunkAPI.dispatch(deleteTodo(id));
  }
);

const initialState = {
  list: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const { id, title, body } = action.payload;
      state.list.push({ id, title, body });
    },
    deleteTodo: (state, action) => {
      const id = action.payload;
      state.list = state.list.filter((todo) => todo.id !== id);
    },
  },
});

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
