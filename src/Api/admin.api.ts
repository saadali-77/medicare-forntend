import api from "./axios";
import type { Appointment } from "../types/appointment";
import type { ApiDoctor } from "../types/doctor";

interface PersonRef {
  name?: string;
  email?: string;
}

export type AdminDoctor = ApiDoctor;

export interface UpdateDoctorPayload {
  specialization?: string;
  qualification?: string;
  experience?: number;
  licenseNumber?: string;
  bio?: string;
  departmentId?: number;
  imageUrl?: string;
}

export interface Department {
  id: number;
  name: string;
  description?: string | null;
}

export interface DepartmentPayload {
  name: string;
  description?: string;
}

export interface AdminAppointment extends Appointment {
  patient?: PersonRef;
  user?: PersonRef;
  doctor?: PersonRef & { user?: PersonRef };
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  role?: string;
  isActive?: boolean;
}

// Doctors
export const getAdminDoctors = async () => {
  const { data } = await api.get<AdminDoctor[]>("/admin/doctors");
  return data;
};

export const updateAdminDoctor = async (
  id: number,
  payload: UpdateDoctorPayload,
) => {
  const { data } = await api.patch<AdminDoctor>(`/admin/doctors/${id}`, payload);
  return data;
};

export const updateDoctorStatus = async (id: number, isAvailable: boolean) => {
  const { data } = await api.patch<AdminDoctor>(`/admin/doctors/${id}/status`, {
    isAvailable,
  });
  return data;
};

// Departments
export const getDepartments = async () => {
  const { data } = await api.get<Department[]>("/admin/departments");
  return data;
};

export const createDepartment = async (payload: DepartmentPayload) => {
  const { data } = await api.post<Department>("/admin/departments", payload);
  return data;
};

export const updateDepartment = async (
  id: number,
  payload: Partial<DepartmentPayload>,
) => {
  const { data } = await api.patch<Department>(`/admin/departments/${id}`, payload);
  return data;
};

export const deleteDepartment = async (id: number) => {
  await api.delete(`/admin/departments/${id}`);
};

// Appointments
export const getAdminAppointments = async () => {
  const { data } = await api.get<AdminAppointment[]>("/admin/appointments");
  return data;
};

export const confirmAppointment = async (id: number) => {
  const { data } = await api.patch<AdminAppointment>(
    `/admin/appointments/${id}/confirm`,
  );
  return data;
};

export const updateAppointmentStatus = async (id: number, status: string) => {
  const { data } = await api.patch<AdminAppointment>(
    `/admin/appointments/${id}/status`,
    { status },
  );
  return data;
};

// Users
export const getAdminUsers = async () => {
  const { data } = await api.get<AdminUser[]>("/admin/users");
  return data;
};
