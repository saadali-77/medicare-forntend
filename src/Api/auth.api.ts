import api from "./axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    name: string;
    email: string;
    role?: string;
  };
}

export interface CurrentUser {
  name: string;
  email: string;
}

export const getCurrentUser = async () => {
  const { data } = await api.get<CurrentUser>("/auth/me");
  return data;
};

export const loginRequest = async (payload: LoginPayload) => {
  const { data } = await api.post<AuthResponse>("/auth/login", payload);
  return data;
};

export const registerRequest = async (payload: RegisterPayload) => {
  await api.post("/auth/register", payload);
};
