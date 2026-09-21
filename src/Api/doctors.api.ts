import api from "./axios";
import type { ApiDoctor } from "../types/doctor";

export const getDoctors = async () => {
  const { data } = await api.get<ApiDoctor[]>("/doctors");
  return data;
};
