// src/redux/store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import collectionsReducer from "./collectionsSlice";
import apiTestingReducer from "./apiTestingSlice";
import appStateReducer from './appSlice';


const LOCAL_STORAGE_KEY = 'reduxState';

// Load state from localStorage
function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn('Failed to load state:', e);
    return undefined;
  }
}

// Save state to localStorage
function saveToLocalStorage(state: RootState) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
  } catch (e) {
    console.warn('Failed to save state:', e);
  }
}

// Preloaded state
const preloadedState = loadFromLocalStorage();

const rootReducers = combineReducers({
  collections: collectionsReducer,
  apiTesting: apiTestingReducer,
  appState: appStateReducer
})

export const store = configureStore({
  // reducer: {
  //   collections: collectionsReducer,
  //   apiTesting: apiTestingReducer,
  //   appState: appStateReducer
  // },
  reducer: rootReducers,
  preloadedState,
  devTools: process.env.NODE_ENV !== "production",
});

// Subscribe to store updates
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
