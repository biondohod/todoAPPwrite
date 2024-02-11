import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILogInUser, authState } from "@/types";
import { logInUser, logOutUser } from "@/lib/appwrite/api";
import { createErrorToast, createSuccessToast } from "@/utils/utils";

const initialState: authState = {
  isAuthorized: null,
  isLoading: false,
  isError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthorized: (state, action: PayloadAction<boolean>) => {
      state.isAuthorized = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(logIn.fulfilled, (state) => {
        state.isAuthorized = true;
        state.isLoading = false;
        createSuccessToast(
          "Logged in successfully, redirecting to dashboard.",
          3000
        );
      })
      .addCase(logIn.rejected, (state) => {
        state.isLoading = false;
        state.isError = "Error logging in, please try again.";
      })
      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isAuthorized = false;
        state.isLoading = false;
        createSuccessToast(
          "Logged out successfully, redirecting to log in page.",
          3000
        );
      })
      .addCase(logOut.rejected, (state) => {
        state.isLoading = false;
        state.isError = "Error logging out, please try again.";
      });
  },
});

export const logIn = createAsyncThunk(
  "auth/logIn",
  async (user: ILogInUser, { rejectWithValue }) => {
    try {
      await logInUser(user);
    } catch (error) {
      if (error instanceof Error) {
        createErrorToast(error.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const logOut = createAsyncThunk(
  "auth/logOut",
  async (_, { rejectWithValue }) => {
    try {
      await logOutUser();
    } catch (error) {
      if (error instanceof Error) {
        createErrorToast(error.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const { setAuthorized } = authSlice.actions;
export const authReducer = authSlice.reducer;
