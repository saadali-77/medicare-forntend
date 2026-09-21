import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Award, CalendarDays, Clock3, IdCard } from "lucide-react";
import { useDoctors } from "../hooks/useDoctors";
import { DoctorPhoto } from "../components/doctors/DoctorCard";
import { getDoctorDepartment, getDoctorName } from "../utils/adminDoctor";
import { getErrorMessage } from "../utils/errors";

const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

const secondaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

const DoctorDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: doctors, isLoading, error } = useDoctors();
  const doctor = doctors?.find((entry) => String(entry.id) === id);

  if (isLoading) {
    return <p className="py-24 text-center text-slate-500">Loading...</p>;
  }

  if (error) {
    return (
      <p className="mx-auto my-24 max-w-xl rounded-lg bg-red-50 px-4 py-3 text-center text-sm text-red-700">
        {getErrorMessage(error)}
      </p>
    );
  }

  if (!doctor) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-lg font-semibold text-slate-900">Doctor not found</p>
        <p className="mt-2 text-sm text-slate-500">
          The profile you're looking for doesn't exist or may have been removed.
        </p>
        <Link to="/doctors" className={`${primaryButtonClass} mt-6`}>
          <ArrowLeft size={16} />
          Back to Doctors
        </Link>
      </div>
    );
  }

  const name = getDoctorName(doctor);
  const department = getDoctorDepartment(doctor);

  const related = (doctors ?? [])
    .filter(
      (entry) =>
        entry.id !== doctor.id &&
        entry.specialization &&
        entry.specialization === doctor.specialization,
    )
    .slice(0, 3);

  return (
    <div>
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <Link
            to="/doctors"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            <ArrowLeft size={16} />
            Back to Doctors
          </Link>

          <div className="mt-8 grid gap-10 md:grid-cols-[320px_1fr] md:items-start">
            <div className="h-72 overflow-hidden rounded-3xl bg-blue-100 md:h-80">
              <DoctorPhoto doctor={doctor} />
            </div>

            <div>
              {department && (
                <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-700">
                  {department}
                </span>
              )}

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {name}
              </h1>

              {doctor.specialization && (
                <p className="mt-2 text-lg font-medium text-blue-600">
                  {doctor.specialization}
                </p>
              )}

              {doctor.bio && (
                <p className="mt-5 max-w-2xl leading-7 text-slate-600">
                  {doctor.bio}
                </p>
              )}

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
                {doctor.qualification && (
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-slate-400" />
                    {doctor.qualification}
                  </div>
                )}
                {doctor.experience != null && (
                  <div className="flex items-center gap-2">
                    <Clock3 size={16} className="text-slate-400" />
                    {doctor.experience} Years Experience
                  </div>
                )}
                {doctor.licenseNumber && (
                  <div className="flex items-center gap-2">
                    <IdCard size={16} className="text-slate-400" />
                    License {doctor.licenseNumber}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} className="text-slate-400" />
                  <span className={doctor.isAvailable ? "text-green-600" : "text-slate-500"}>
                    {doctor.isAvailable ? "Available for appointments" : "Currently unavailable"}
                  </span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to={`/appointments?doctorId=${doctor.id}`}
                  className={primaryButtonClass}
                >
                  <CalendarDays size={18} />
                  Book Appointment
                </Link>
                <Link to="/doctors" className={secondaryButtonClass}>
                  View All Doctors
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            More in {doctor.specialization}
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((entry) => (
              <Link
                key={entry.id}
                to={`/doctors/${entry.id}`}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-48 overflow-hidden bg-blue-100">
                  <DoctorPhoto doctor={entry} />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900">
                    {getDoctorName(entry)}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-blue-600">
                    {entry.specialization}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default DoctorDetails;
