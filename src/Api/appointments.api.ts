import api from "./axios";
import type { Appointment } from "../types/appointment";

export interface CreateAppointmentPayload {
  doctorId: number;
  appointmentDate: string;
  reason?: string;
}

export const createAppointment = async (payload: CreateAppointmentPayload) => {
  const { data } = await api.post<Appointment>("/appointments", payload);
  return data;
};

export const getMyAppointments = async () => {
  const { data } = await api.get<Appointment[]>("/appointments/my");
  return data;
};

export const cancelAppointment = async (id: number) => {
  const { data } = await api.patch<Appointment>(`/appointments/${id}/cancel`);
  return data;
};
