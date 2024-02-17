import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { todoItem, todoState } from "@/types";
import { addTodoTask, getTodosList, updateTodosList } from "@/lib/appwrite/api";
import { createErrorToast, createSuccessToast } from "@/utils/utils";

const initialState: todoState = {
  todosList: null,
  isLoading: false,
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
      .addCase(addTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<todoItem>) => {
        if (state.todosList) {
          state.todosList = [...state.todosList, action.payload];
        } else {
          state.todosList = [action.payload];
        }
        state.isLoading = false;
        createSuccessToast("The task has been successfully created");
      })
      .addCase(addTodo.rejected, (state) => {
        state.isLoading = false;
      }).addCase(updateTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTodo.fulfilled, (state, action: PayloadAction<todoItem>) => {
        state.isLoading = false;
        createSuccessToast("The task has been successfully completed");
      })
      .addCase(updateTodo.rejected, (state) => {
        state.isLoading = false;
      });;
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

export const updateTodo = createAsyncThunk(
  "todo/updateTodo",
  async (
    { id, isCompleted }: { id: string; isCompleted: boolean },
    { rejectWithValue }
  ) => {
    try {
      return await updateTodosList(id, isCompleted);
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
