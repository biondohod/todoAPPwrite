import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TodoItem, todoState, TodoItemsList } from "@/types";
import {
  addTodoTask,
  deleteTodoFromList,
  getTodosList,
  updateTodosList,
} from "@/lib/appwrite/api";
import { createErrorToast, createSuccessToast } from "@/utils/utils";

const initialState: todoState = {
  todosList: null,
  isLoading: false,
  isError: false,
  toComplete: 0,
  completed: 0,
};

/**
 * Represents the Redux slice for managing todo items.
 */
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
      .addCase(getTodos.pending, (state) => {
        state.isError = false;
      })
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
          state.isError = false;
        }
      )
      .addCase(getTodos.rejected, (state) => {
        state.isError = true;
      })
      .addCase(addTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<TodoItem>) => {
        if (state.todosList) {
          state.todosList[action.payload.$id] = action.payload;
          state.isLoading = false;
          createSuccessToast("The task has been successfully created");
          state.toComplete++;
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
          state.todosList[itemId].isCompleted =
            action.payload[itemId].isCompleted;
        }
        if (action.payload[itemId].isCompleted) {
          state.completed++;
          state.toComplete--;
          createSuccessToast("The task has been successfully completed");
        } else {
          state.completed--;
          state.toComplete++;
          createSuccessToast("The task has been marked as incomplete");
        }
      })
      .addCase(updateTodo.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        if (state.todosList) {
          if (state.todosList[action.payload].isCompleted) {
            state.completed--;
          } else {
            state.toComplete--;
          }
          delete state.todosList[action.payload];
        }
        createSuccessToast("The task has been successfully deleted");
      })
      .addCase(deleteTodo.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

/**
 * Adds a new todo.
 *
 * @param email - The email of the user adding the todo.
 * @param todo - The content of the todo.
 * @returns A promise that resolves to the added todo or rejects with an error.
 */
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

/**
 * Retrieves the list of todos for a given email.
 *
 * @param email - The email of the user.
 * @returns A promise that resolves to the list of todos.
 */
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

/**
 * Updates a todo item asynchronously.
 *
 * @param id - The ID of the todo item to update.
 * @param isCompleted - The new completion status of the todo item.
 * @returns A promise that resolves to the updated todo item.
 */
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

/**
 * Deletes a todo item asynchronously.
 *
 * @param id - The ID of the todo item to delete.
 * @returns A promise that resolves to the ID of the deleted todo item.
 */
export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteTodoFromList(id);
      return id;
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
