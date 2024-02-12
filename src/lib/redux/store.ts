import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

/**
 * The Redux store for the application.
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
