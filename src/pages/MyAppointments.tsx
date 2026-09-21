import { Link } from "react-router-dom";
import { CalendarDays, Clock3, Stethoscope } from "lucide-react";
import {
  useCancelAppointment,
  useMyAppointments,
} from "../hooks/useAppointments";
import { useDoctors } from "../hooks/useDoctors";
import { getDoctorDepartment, getDoctorName } from "../utils/adminDoctor";
import { getErrorMessage } from "../utils/errors";

const eyebrowClass =
  "inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-700";

const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

const statusStyles: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-green-100 text-green-700",
  completed: "bg-blue-100 text-blue-700",
  cancelled: "bg-slate-100 text-slate-500",
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-PK", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const formatTime = (value: string) =>
  new Date(value).toLocaleTimeString("en-PK", {
    hour: "numeric",
    minute: "2-digit",
  });

const MyAppointments = () => {
  const { data: appointments, isLoading, isError, error } = useMyAppointments();
  const cancelMutation = useCancelAppointment();
  const { data: doctors } = useDoctors();

  return (
    <div>
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <span className={eyebrowClass}>My Appointments</span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Your Booked Appointments
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Review your visits or cancel one you can no longer attend.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        {isLoading ? (
          <p className="text-center text-slate-500">Loading appointments...</p>
        ) : isError ? (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-center text-sm text-red-700">
            {getErrorMessage(error)}
          </p>
        ) : !appointments || appointments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-16 text-center">
            <p className="text-lg font-semibold text-slate-900">
              No appointments booked yet
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Book a visit with one of our specialists.
            </p>
            <Link
              to="/appointments"
              className={`${primaryButtonClass} mt-6`}
            >
              Book Appointment
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {cancelMutation.isError && (
              <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">
                {getErrorMessage(cancelMutation.error)}
              </p>
            )}

            {appointments.map((appointment) => {
              const doctor = doctors?.find(
                (entry) => entry.id === appointment.doctorId,
              );
              const canCancel =
                appointment.status.toLowerCase() === "pending" ||
                appointment.status.toLowerCase() === "confirmed";

              return (
                <div
                  key={appointment.id}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Stethoscope size={22} />
                    </div>

                    <div>
                      <h2 className="font-bold text-slate-900">
                        {doctor
                          ? getDoctorName(doctor)
                          : `Doctor #${appointment.doctorId}`}
                      </h2>
                      {doctor?.specialization && (
                        <p className="text-sm font-medium text-blue-600">
                          {[doctor.specialization, getDoctorDepartment(doctor)]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      )}

                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-600">
                        <span className="inline-flex items-center gap-2">
                          <CalendarDays size={14} className="text-slate-400" />
                          {formatDate(appointment.appointmentDate)}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <Clock3 size={14} className="text-slate-400" />
                          {formatTime(appointment.appointmentDate)}
                        </span>
                      </div>

                      {appointment.reason && (
                        <p className="mt-2 text-sm text-slate-500">
                          {appointment.reason}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[appointment.status.toLowerCase()] ?? "bg-slate-100 text-slate-600"}`}
                    >
                      {appointment.status}
                    </span>

                    {canCancel && (
                      <button
                        type="button"
                        onClick={() => cancelMutation.mutate(appointment.id)}
                        disabled={cancelMutation.isPending}
                        className="text-sm font-medium text-slate-500 transition hover:text-red-600 disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default MyAppointments;
