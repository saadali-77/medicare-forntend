import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AuthUser {
  fullName: string;
  email: string;
  role?: string;
  avatar?: string;
}

export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ user: AuthUser; accessToken: string }>,
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
    setAvatar: (state, action: PayloadAction<string | undefined>) => {
      if (state.user) {
        state.user.avatar = action.payload;
      }
    },
  },
});

export const { login, logout, setAvatar } = authSlice.actions;
export default authSlice.reducer;
