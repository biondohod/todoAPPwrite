import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { todoItem, todoState } from "@/types";
import { addTodoTask, getTodosList } from "@/lib/appwrite/api";
import { createErrorToast, createSuccessToast } from "@/utils/utils";

const initialState: todoState = {
  todosList: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodosList: (state, action: PayloadAction<todoItem[]>) => {
      state.todosList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.fulfilled, (state, action) => {
        state.todosList = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<todoItem>) => {
        console.log("action", action);
        console.log("payload", action.payload);
        if (state.todosList) {
          state.todosList = [...state.todosList, action.payload];
        } else {
          state.todosList = [action.payload];
        }
        createSuccessToast("The task has been successfully created")
        console.log("state", state.todosList);
      });
  },
});

export const addTodo = createAsyncThunk(
  "todo/addTodo",
  async (
    { email, todo }: { email: string; todo: string },
    { rejectWithValue }
  ) => {
    try {
      return await addTodoTask(email, todo);
    } catch (error) {
      if (error instanceof Error) {
        createErrorToast(error.message);
      } else {
        createErrorToast();
      }
      return rejectWithValue(error);
    }
  }
);
export const getTodos = createAsyncThunk(
  "todo/getTodos",
  async (email: string, { rejectWithValue }) => {
    try {
      return await getTodosList(email);
    } catch (error) {
      if (error instanceof Error) {
        createErrorToast(error.message);
      } else {
        createErrorToast();
      }
      return rejectWithValue(error);
    }
  }
);

export const { setTodosList } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
