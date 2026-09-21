import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  confirmAppointment,
  createDepartment,
  deleteDepartment,
  getAdminAppointments,
  getAdminDoctors,
  getAdminUsers,
  getDepartments,
  updateAdminDoctor,
  updateAppointmentStatus,
  updateDepartment,
  updateDoctorStatus,
  type DepartmentPayload,
  type UpdateDoctorPayload,
} from "../Api/admin.api";
import { useAuth } from "./useAuth";

const useAdminQuery = <T>(name: string, queryFn: () => Promise<T>) => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: ["admin", name],
    queryFn,
    enabled: Boolean(accessToken),
  });
};

const useAdminMutation = <TVariables, TResult>(
  mutationFn: (variables: TVariables) => Promise<TResult>,
  invalidate: string[],
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () =>
      Promise.all(
        invalidate.map((name) =>
          queryClient.invalidateQueries({ queryKey: ["admin", name] }),
        ),
      ),
  });
};

export const useAdminDoctors = () => useAdminQuery("doctors", getAdminDoctors);
export const useAdminAppointments = () =>
  useAdminQuery("appointments", getAdminAppointments);
export const useDepartments = () => useAdminQuery("departments", getDepartments);
export const useAdminUsers = () => useAdminQuery("users", getAdminUsers);

export const useUpdateAdminDoctor = () =>
  useAdminMutation(
    ({ id, payload }: { id: number; payload: UpdateDoctorPayload }) =>
      updateAdminDoctor(id, payload),
    ["doctors"],
  );

export const useUpdateDoctorStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isAvailable }: { id: number; isAvailable: boolean }) =>
      updateDoctorStatus(id, isAvailable),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["admin", "doctors"] });
      void queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
};

export const useCreateDepartment = () =>
  useAdminMutation(
    (payload: DepartmentPayload) => createDepartment(payload),
    ["departments"],
  );

export const useUpdateDepartment = () =>
  useAdminMutation(
    ({ id, payload }: { id: number; payload: Partial<DepartmentPayload> }) =>
      updateDepartment(id, payload),
    ["departments", "doctors"],
  );

export const useDeleteDepartment = () =>
  useAdminMutation((id: number) => deleteDepartment(id), ["departments", "doctors"]);

export const useConfirmAppointment = () =>
  useAdminMutation((id: number) => confirmAppointment(id), ["appointments"]);

export const useUpdateAppointmentStatus = () =>
  useAdminMutation(
    ({ id, status }: { id: number; status: string }) =>
      updateAppointmentStatus(id, status),
    ["appointments"],
  );
