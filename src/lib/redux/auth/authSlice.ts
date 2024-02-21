import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILogInUser, INewUser, authState } from "@/types";
import {
  createUserAccount,
  logInUser,
  logOutUser,
  verifyUserEmail,
} from "@/lib/appwrite/api";
import { createErrorToast, createSuccessToast } from "@/utils/utils";

const initialState: authState = {
  isAuthorized: null,
  isLoading: false,
  email: null,
  isEmailVerified: null,
};

/**
 * Represents the Redux slice for authentication.
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
    setEmailVerified: (state, action: PayloadAction<boolean>) => {
      state.isEmailVerified = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.isLoading = false;
        state.isEmailVerified = false;
        createSuccessToast("Your account has been created successfully!", 3000);
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
        state.isEmailVerified = false;
        localStorage.setItem("email", "");
        createSuccessToast(
          "Logged out successfully, redirecting to log in page.",
          3000
        );
      })
      .addCase(logOut.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.isLoading = false;
        state.isEmailVerified = true;
        createSuccessToast("Email has been succesfully verified.", 3000);
      })
      .addCase(verifyEmail.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

/**
 * Creates a new user account by signing up.
 * @param user - The user object containing the details of the new user.
 * @returns A promise that resolves when the user account is successfully created.
 */
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

/**
 * Logs in a user with the provided email and password.
 * @param user - The user object containing the email and password.
 * @returns A promise that resolves when the user is successfully logged in.
 */
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

/**
 * Logs out the current user by deleting the session.
 * @returns A promise that resolves when the user is successfully logged out.
 */
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

/**
 * Verifies the user's email using the provided secret and user ID.
 *
 * @param secret - The secret code for email verification.
 * @param userId - The ID of the user to verify the email for.
 * @returns A promise that resolves when the email is successfully verified.
 */
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (
    { secret, userId }: { secret: string; userId: string },
    { rejectWithValue }
  ) => {
    try {
      await verifyUserEmail(secret, userId);
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

export const { setAuthorized, setEmail, setEmailVerified } = authSlice.actions;
export const authReducer = authSlice.reducer;
