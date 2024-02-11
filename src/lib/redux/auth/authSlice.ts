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
    builder.addCase(logIn.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    }).addCase(logIn.fulfilled, (state, action) => {
      state.isAuthorized = action.payload;
      createSuccessToast(
        "Logged in successfully, redirecting to dashboard.",
        3000
      );
      window.location.href = "/dashboard";
    }).addCase(logIn.rejected, (state) => {
      state.isLoading = false;
      state.isError = "Error logging in, please try again.";
    }
    );
  },
});

export const logIn = createAsyncThunk(
  "auth/logInUser",
  async (user: ILogInUser, {rejectWithValue}) => {
    try {
      logInUser(user);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        createErrorToast(error.message);
      }
      rejectWithValue(error);
      return false;
    }
  }
);

export const logOut = createAsyncThunk(
  "auth/logOutUser",
  async (_, {rejectWithValue}) => {
    try {
      logOutUser();
      return true;
    } catch (error) {
      if (error instanceof Error) {
        createErrorToast(error.message);
        console.error(error);
      }
      console.error(error);
      rejectWithValue(error);
    }
  }
)

export const { setAuthorized } = authSlice.actions;
export const authReducer = authSlice.reducer;
