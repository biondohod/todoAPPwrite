import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILogInUser, INewUser, authState } from "@/types";
import { createUserAccount, logInUser, logOutUser } from "@/lib/appwrite/api";
import { createErrorToast, createSuccessToast } from "@/utils/utils";

const initialState: authState = {
  isAuthorized: null,
  isLoading: false,
  email: null,
};

/**
 * Redux slice for managing authentication state.
 *
 * @remarks
 * This slice handles actions related to authentication, such as setting the authorized state, logging in, and logging out.
 *
 * @param name - The name of the slice.
 * @param initialState - The initial state of the slice.
 * @param reducers - The reducer functions for the slice.
 * @param extraReducers - Additional reducer functions for handling extra actions.
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthorized: (state, action: PayloadAction<boolean>) => {
      state.isAuthorized = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.isLoading = false;
        createSuccessToast(
          "Your account has been created successfully!",
          3000
        );
      })
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isAuthorized = true;
        state.isLoading = false;
        state.email = action.payload;
        localStorage.setItem("email", action.payload);
        createSuccessToast(
          "Logged in successfully, redirecting to dashboard.",
          3000
        );
      })
      .addCase(logIn.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isAuthorized = false;
        state.isLoading = false;
        state.email = null;
        localStorage.setItem("email", "");
        createSuccessToast(
          "Logged out successfully, redirecting to log in page.",
          3000
        );
      })
      .addCase(logOut.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (user: INewUser, { rejectWithValue }) => {
    try {
      await createUserAccount(user);
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

export const logIn = createAsyncThunk(
  "auth/logIn",
  async (user: ILogInUser, { rejectWithValue }) => {
    try {
      await logInUser(user);
      return user.email;
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

export const logOut = createAsyncThunk(
  "auth/logOut",
  async (_, { rejectWithValue }) => {
    try {
      await logOutUser();
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

export const { setAuthorized, setEmail } = authSlice.actions;
export const authReducer = authSlice.reducer;
