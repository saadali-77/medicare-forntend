import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cancelAppointment,
  createAppointment,
  getMyAppointments,
  type CreateAppointmentPayload,
} from "../Api/appointments.api";
import { useAuth } from "./useAuth";

const useAppointmentsKey = () => {
  const { user } = useAuth();
  return ["appointments", user?.email] as const;
};

export const useMyAppointments = () => {
  const { accessToken } = useAuth();
  const queryKey = useAppointmentsKey();

  return useQuery({
    queryKey,
    queryFn: getMyAppointments,
    enabled: Boolean(accessToken),
  });
};

export const useBookAppointment = () => {
  const queryClient = useQueryClient();
  const queryKey = useAppointmentsKey();

  return useMutation({
    mutationFn: (payload: CreateAppointmentPayload) =>
      createAppointment(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });
};

export const useCancelAppointment = () => {
  const queryClient = useQueryClient();
  const queryKey = useAppointmentsKey();

  return useMutation({
    mutationFn: (id: number) => cancelAppointment(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });
};
