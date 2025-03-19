import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
  }
});

console.log("Redux store initialized");

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 