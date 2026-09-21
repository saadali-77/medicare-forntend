import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { useDoctors } from "../hooks/useDoctors";
import { getDoctorName } from "../utils/adminDoctor";
import type { ApiDoctor } from "../types/doctor";
import { useBookAppointment } from "../hooks/useAppointments";
import { getErrorMessage } from "../utils/errors";
import { toAppointmentDate } from "../utils/dates";
import { useAuth } from "../hooks/useAuth";

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

const appointmentSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone number"),
  department: z.string().optional(),
  doctorId: z.string().min(1, "Please select a doctor"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  message: z.string().optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

const eyebrowClass =
  "inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-700";

const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

const inputClass =
  "w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20";

const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

const errorClass = "mt-1 text-xs text-red-600";

const today = new Date().toISOString().split("T")[0];

const AppointmentsPage = ({ doctors }: { doctors: ApiDoctor[] }) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const bookMutation = useBookAppointment();
  const preselectedDoctor = doctors.find(
    (doctor) => String(doctor.id) === searchParams.get("doctorId"),
  );

  const specializations = useMemo(
    () => [
      ...new Set(
        doctors
          .map((doctor) => doctor.specialization)
          .filter((value): value is string => Boolean(value)),
      ),
    ],
    [doctors],
  );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      department: "",
      doctorId: preselectedDoctor ? String(preselectedDoctor.id) : "",
    },
  });

  const selectedDepartment = watch("department");

  const availableDoctors = useMemo(
    () =>
      doctors.filter(
        (doctor) =>
          doctor.isAvailable !== false &&
          (!selectedDepartment || doctor.specialization === selectedDepartment),
      ),
    [doctors, selectedDepartment],
  );

  const onSubmit = (values: AppointmentFormValues) => {
    bookMutation.mutate({
      doctorId: Number(values.doctorId),
      appointmentDate: toAppointmentDate(values.date, values.time),
      reason: values.message || undefined,
    });
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <span className={eyebrowClass}>Appointments</span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Book an Appointment
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Fill out the form below and our team will confirm your
            appointment shortly.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            {bookMutation.isSuccess ? (
              <div className="flex flex-col items-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <CheckCircle2 size={32} />
                </div>

                <h2 className="mt-6 text-2xl font-bold text-slate-900">
                  Appointment Requested
                </h2>

                <p className="mt-2 max-w-md text-slate-600">
                  Thanks for reaching out. Our team will contact you shortly
                  to confirm your appointment details.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Link
                    to="/my-appointments"
                    className={primaryButtonClass}
                  >
                    View My Appointments
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      bookMutation.reset();
                      reset();
                    }}
                    className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Book Another Appointment
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
                noValidate
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="fullName">
                      Full Name
                    </label>
                    <div className="relative">
                      <User
                        size={16}
                        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        id="fullName"
                        type="text"
                        placeholder="John Doe"
                        className={`${inputClass} pl-10`}
                        {...register("fullName")}
                      />
                    </div>
                    {errors.fullName && (
                      <p className={errorClass}>{errors.fullName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="email">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        size={16}
                        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className={`${inputClass} pl-10`}
                        {...register("email")}
                      />
                    </div>
                    {errors.email && (
                      <p className={errorClass}>{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="phone">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone
                        size={16}
                        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className={`${inputClass} pl-10`}
                        {...register("phone")}
                      />
                    </div>
                    {errors.phone && (
                      <p className={errorClass}>{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="department">
                      Specialization
                    </label>
                    <select
                      id="department"
                      className={inputClass}
                      {...register("department")}
                    >
                      <option value="">All specializations</option>
                      {specializations.map((specialization) => (
                        <option key={specialization} value={specialization}>
                          {specialization}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass} htmlFor="doctorId">
                    Doctor
                  </label>
                  <select
                    id="doctorId"
                    className={inputClass}
                    {...register("doctorId")}
                  >
                    <option value="">Select doctor</option>
                    {availableDoctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {getDoctorName(doctor)}
                        {doctor.specialization
                          ? ` — ${doctor.specialization}`
                          : ""}
                      </option>
                    ))}
                  </select>
                  {errors.doctorId && (
                    <p className={errorClass}>{errors.doctorId.message}</p>
                  )}
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="date">
                      Preferred Date
                    </label>
                    <div className="relative">
                      <CalendarDays
                        size={16}
                        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        id="date"
                        type="date"
                        min={today}
                        className={`${inputClass} pl-10`}
                        {...register("date")}
                      />
                    </div>
                    {errors.date && (
                      <p className={errorClass}>{errors.date.message}</p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="time">
                      Preferred Time
                    </label>
                    <div className="relative">
                      <Clock3
                        size={16}
                        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
                      />
                      <select
                        id="time"
                        className={`${inputClass} pl-10`}
                        {...register("time")}
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.time && (
                      <p className={errorClass}>{errors.time.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className={labelClass} htmlFor="message">
                    Reason for Visit (optional)
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Briefly describe your symptoms or reason for the visit"
                    className={inputClass}
                    {...register("message")}
                  />
                </div>

                {!isAuthenticated && (
                  <p className="rounded-lg bg-amber-50 px-4 py-2.5 text-sm text-amber-800">
                    Please{" "}
                    <Link
                      to="/login"
                      state={{ from: location }}
                      className="font-semibold underline"
                    >
                      sign in
                    </Link>{" "}
                    to book and track your appointments.
                  </p>
                )}

                {bookMutation.isError && (
                  <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">
                    {getErrorMessage(bookMutation.error)}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={bookMutation.isPending || !isAuthenticated}
                  className={`${primaryButtonClass} w-full sm:w-auto`}
                >
                  {bookMutation.isPending
                    ? "Submitting..."
                    : "Confirm Appointment"}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-bold text-slate-900">
                Working Hours
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex items-center justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-medium text-slate-900">
                    08:00 AM - 08:00 PM
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Saturday</span>
                  <span className="font-medium text-slate-900">
                    09:00 AM - 05:00 PM
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Sunday</span>
                  <span className="font-medium text-slate-900">
                    Emergency Only
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white shadow-lg shadow-blue-600/20">
              <h3 className="text-lg font-bold">Need Immediate Help?</h3>
              <p className="mt-2 text-sm text-blue-100">
                Our emergency line is available 24/7.
              </p>
              <p className="mt-4 text-2xl font-bold">+1 (555) 123-4567</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

const Appointments = () => {
  const { data: doctors, isLoading, error } = useDoctors();

  if (isLoading) {
    return <p className="py-24 text-center text-slate-500">Loading...</p>;
  }

  if (error || !doctors) {
    return (
      <p className="mx-auto my-24 max-w-xl rounded-lg bg-red-50 px-4 py-3 text-center text-sm text-red-700">
        {getErrorMessage(error)}
      </p>
    );
  }

  return <AppointmentsPage doctors={doctors} />;
};

export default Appointments;
