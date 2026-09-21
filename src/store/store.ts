import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer, { type AuthState } from "./authSlice";

const AUTH_KEY = "auth";

const loadAuth = (): AuthState | undefined => {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? (JSON.parse(raw) as AuthState) : undefined;
  } catch {
    return undefined;
  }
};

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const preloadedState: Partial<RootState> = {};
const savedAuth = loadAuth();
if (savedAuth) preloadedState.auth = savedAuth;

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

store.subscribe(() => {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(store.getState().auth));
  } catch {
    // storage unavailable or full; the session stays in memory
  }
});

export type AppDispatch = typeof store.dispatch;
