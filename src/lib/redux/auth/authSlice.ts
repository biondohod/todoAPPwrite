import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILogInUser, authState } from "@/types";
import { logInUser } from "@/lib/appwrite/api";
import { createErrorToast, createSuccessToast } from "@/utils/utils";

const initialState: authState = {
  isAuthorized: false,
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
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.isAuthorized = action.payload;
      createSuccessToast(
        "Logged in successfully, redirecting to dashboard.",
        3000
      );
      window.location.href = "/dashboard";
    });
  },
});

export const logIn = createAsyncThunk(
  "auth/logInUser",
  async (user: ILogInUser) => {
    try {
      logInUser(user);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        createErrorToast(error.message);
        console.error(error);
      }
      console.error(error);
      return false;
    }
  }
);

export const { setAuthorized } = authSlice.actions;
export const authReducer = authSlice.reducer;
