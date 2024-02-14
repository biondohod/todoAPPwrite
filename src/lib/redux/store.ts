import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { todoReducer } from "./todo/todoSlice";

/**
 * The Redux store for the application.
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    todo: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
