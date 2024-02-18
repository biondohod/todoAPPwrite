import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TodoItem, todoState, TodoItemsList } from "@/types";
import { addTodoTask, getTodosList, updateTodosList } from "@/lib/appwrite/api";
import { createErrorToast, createSuccessToast } from "@/utils/utils";

const initialState: todoState = {
  //make todoList an object like {TodoItemId: TodoItem}
  todosList: null,
  isLoading: false,
  toComplete: 0,
  completed: 0,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodosList: (state, action: PayloadAction<TodoItemsList>) => {
      state.todosList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getTodos.fulfilled,
        (state, action: PayloadAction<TodoItemsList>) => {
          state.todosList = action.payload;
          const [completedTasks, tasksToComplete] = Object.values(
            action.payload
          ).reduce(
            ([completed, toComplete], todo) => {
              if (todo.isCompleted) {
                return [completed + 1, toComplete];
              } else {
                return [completed, toComplete + 1];
              }
            },
            [0, 0]
          );
          state.toComplete = tasksToComplete;
          state.completed = completedTasks;
        }
      )
      .addCase(addTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<TodoItem>) => {
        if (state.todosList) {
          state.todosList[action.payload.$id] = action.payload;
          state.isLoading = false;
          createSuccessToast("The task has been successfully created");
          state.toComplete = state.toComplete + 1;
        }
      })
      .addCase(addTodo.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        const itemId = Object.keys(action.payload)[0];
        if (state.todosList) {
          state.todosList[itemId].isCompleted = action.payload[itemId].isCompleted;
        }
        if (action.payload[itemId].isCompleted) {
          state.completed = state.completed + 1;
          state.toComplete = state.toComplete - 1;
          createSuccessToast("The task has been successfully completed");
        } else {
          state.completed = state.completed - 1;
          state.toComplete = state.toComplete + 1;
          createSuccessToast("The task has been marked as incomplete");
        }
      })
      .addCase(updateTodo.rejected, (state) => {
        state.isLoading = false;
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
