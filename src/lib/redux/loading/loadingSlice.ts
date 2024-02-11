import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loadingState } from "@/types";

const initialState: loadingState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  }
});

export const { setIsLoading } = loadingSlice.actions;
export const authReducer = loadingSlice.reducer;
