import { Link } from "react-router-dom";
import { Award, CalendarDays, Clock3 } from "lucide-react";
import type { ApiDoctor } from "../../types/doctor";
import { getDoctorDepartment, getDoctorName } from "../../utils/adminDoctor";

const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

const secondaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

export const DoctorPhoto = ({
  doctor,
  className = "",
}: {
  doctor: ApiDoctor;
  className?: string;
}) => {
  const name = getDoctorName(doctor);

  return doctor.imageUrl ? (
    <img
      src={doctor.imageUrl}
      alt={name}
      loading="lazy"
      className={`h-full w-full object-cover ${className}`}
    />
  ) : (
    <div
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 text-6xl font-bold text-blue-600 ${className}`}
    >
      {name.replace(/^Dr\.?\s*/i, "").charAt(0).toUpperCase()}
    </div>
  );
};

export const DoctorCardSkeleton = () => (
  <div className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white">
    <div className="h-56 bg-slate-200" />
    <div className="space-y-3 p-6">
      <div className="h-5 w-2/3 rounded bg-slate-200" />
      <div className="h-4 w-1/3 rounded bg-slate-200" />
      <div className="h-4 w-full rounded bg-slate-100" />
      <div className="h-4 w-4/5 rounded bg-slate-100" />
      <div className="flex gap-3 pt-3">
        <div className="h-10 w-28 rounded-lg bg-slate-200" />
        <div className="h-10 w-40 rounded-lg bg-slate-200" />
      </div>
    </div>
  </div>
);

const DoctorCard = ({ doctor }: { doctor: ApiDoctor }) => {
  const name = getDoctorName(doctor);
  const department = getDoctorDepartment(doctor);

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/doctors/${doctor.id}`} className="block h-56 overflow-hidden">
        <DoctorPhoto doctor={doctor} />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        {department && (
          <span className="inline-flex w-fit items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {department}
          </span>
        )}

        <h3 className={`text-xl font-bold text-slate-900 ${department ? "mt-4" : ""}`}>
          <Link to={`/doctors/${doctor.id}`} className="transition hover:text-blue-600">
            {name}
          </Link>
        </h3>

        {doctor.specialization && (
          <p className="mt-1 font-medium text-blue-600">{doctor.specialization}</p>
        )}

        {doctor.bio && (
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
            {doctor.bio}
          </p>
        )}

        <div className="mt-4 space-y-2 text-sm text-slate-600">
          {doctor.qualification && (
            <div className="flex items-center gap-2">
              <Award size={16} className="text-slate-400" />
              {doctor.qualification}
            </div>
          )}
          <div className="flex items-center gap-2">
            <Clock3 size={16} className="text-slate-400" />
            {doctor.experience != null ? `${doctor.experience} Years Experience · ` : ""}
            <span className={doctor.isAvailable ? "text-green-600" : "text-slate-500"}>
              {doctor.isAvailable ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to={`/doctors/${doctor.id}`} className={secondaryButtonClass}>
            View Profile
          </Link>
          <Link to={`/appointments?doctorId=${doctor.id}`} className={primaryButtonClass}>
            <CalendarDays size={16} />
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
