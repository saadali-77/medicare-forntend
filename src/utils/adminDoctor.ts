import type { AdminDoctor } from "../Api/admin.api";

export const getDoctorName = (doctor: AdminDoctor) =>
  doctor.user?.name ?? `Doctor #${doctor.id}`;

export const getDoctorDepartment = (doctor: AdminDoctor) =>
  doctor.department?.name;

export const getDoctorDepartmentId = (doctor: AdminDoctor) =>
  doctor.departmentId ?? doctor.department?.id ?? undefined;
