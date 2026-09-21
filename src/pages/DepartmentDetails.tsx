import { Link, useParams } from "react-router-dom";
import { AlertCircle, ArrowLeft, CalendarDays, CheckCircle2 } from "lucide-react";
import { getSiteDepartment, siteDepartments } from "../data/departments";
import { useDoctors } from "../hooks/useDoctors";
import DoctorCard, { DoctorCardSkeleton } from "../components/doctors/DoctorCard";

const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

const DepartmentDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const department = getSiteDepartment(slug);
  const { data: doctors, isLoading } = useDoctors();

  if (!department) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-lg font-semibold text-slate-900">
          Department not found
        </p>
        <p className="mt-2 text-sm text-slate-500">
          The department you're looking for doesn't exist.
        </p>
        <Link to="/departments" className={`${primaryButtonClass} mt-6`}>
          <ArrowLeft size={16} />
          All Departments
        </Link>
      </div>
    );
  }

  const Icon = department.icon;

  const departmentDoctors = (doctors ?? []).filter(
    (doctor) =>
      doctor.specialization?.toLowerCase().includes(department.keyword) ||
      doctor.department?.name?.toLowerCase() === department.name.toLowerCase(),
  );

  const otherDepartments = siteDepartments.filter(
    (entry) => entry.slug !== department.slug,
  );

  return (
    <div>
      {/* Header */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <Link
            to="/departments"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            <ArrowLeft size={16} />
            All Departments
          </Link>

          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
                <Icon size={30} />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                  {department.name}
                </h1>
                <p className="mt-2 max-w-2xl text-lg text-slate-600">
                  {department.tagline}
                </p>
              </div>
            </div>

            <Link to="/appointments" className={primaryButtonClass}>
              <CalendarDays size={18} />
              Book Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* Overview + lists */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                About the Department
              </h2>
              <div className="mt-4 space-y-4 leading-7 text-slate-600">
                {department.overview.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Conditions We Treat
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {department.conditions.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700"
                  >
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-blue-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Our Services
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {department.services.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-700"
                  >
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-green-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                <AlertCircle size={18} className="text-amber-600" />
                When to See a Specialist
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {department.symptoms.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-slate-500">
                In an emergency, call our 24/7 emergency line right away.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-bold text-slate-900">
                Other Departments
              </h3>
              <ul className="mt-4 space-y-1">
                {otherDepartments.map((entry) => (
                  <li key={entry.slug}>
                    <Link
                      to={`/departments/${entry.slug}`}
                      className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-blue-600"
                    >
                      {entry.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Doctors */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            {department.name} Doctors
          </h2>

          <div className="mt-8">
            {isLoading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <DoctorCardSkeleton />
              </div>
            ) : departmentDoctors.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
                <p className="font-semibold text-slate-900">
                  No {department.name.toLowerCase()} doctors are listed yet
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Browse all of our doctors or contact us and we'll help you
                  find the right specialist.
                </p>
                <Link to="/doctors" className={`${primaryButtonClass} mt-6`}>
                  View All Doctors
                </Link>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {departmentDoctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DepartmentDetails;
