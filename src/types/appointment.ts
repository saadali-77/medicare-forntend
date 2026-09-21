export interface Appointment {
  id: number;
  doctorId: number;
  appointmentDate: string;
  reason?: string;
  status: string;
}
