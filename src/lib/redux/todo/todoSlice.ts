import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { todoItem, todoState } from "@/types";
import { getTodosList } from "@/lib/appwrite/api";
import { createErrorToast } from "@/utils/utils";

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
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.todosList = action.payload;
    });
  },
});

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
