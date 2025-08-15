// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import collectionsReducer from "./collectionsSlice";
import apiTestingReducer from "./apiTestingSlice"

export const store = configureStore({
  reducer: {
    collections: collectionsReducer,
    apiTesting: apiTestingReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
