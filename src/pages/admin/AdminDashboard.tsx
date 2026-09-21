import { Link } from "react-router-dom";
import { CalendarDays, Stethoscope } from "lucide-react";
import {
  useAdminAppointments,
  useAdminDoctors,
} from "../../hooks/useAdminData";
import AdminTable from "../../components/admin/AdminTable";
import StatusBadge from "../../components/admin/StatusBadge";
import { formatDateTime } from "../../utils/dates";
import { getDoctorDepartment, getDoctorName } from "../../utils/adminDoctor";

const AdminDashboard = () => {
  const doctors = useAdminDoctors();
  const appointments = useAdminAppointments();

  const stats = [
    { label: "Doctors", to: "/admin/doctors", icon: Stethoscope, query: doctors },
    {
      label: "Appointments",
      to: "/admin/appointments",
      icon: CalendarDays,
      query: appointments,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          An overview of your hospital and pharmacy.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, to, icon: Icon, query }) => (
          <Link
            key={label}
            to={to}
            className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
              <Icon size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {query.isLoading ? "…" : query.isError ? "—" : (query.data?.length ?? 0)}
              </p>
              <p className="text-sm text-slate-500">{label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h2 className="font-bold text-slate-900">Doctors</h2>
            <Link
              to="/admin/doctors"
              className="text-sm font-medium text-sky-600 hover:text-sky-700"
            >
              View all
            </Link>
          </div>

          <AdminTable
            columns={[
              {
                header: "Name",
                render: (d) => (
                  <span className="font-medium text-slate-900">
                    {getDoctorName(d)}
                  </span>
                ),
              },
              { header: "Specialization", render: (d) => d.specialization ?? "—" },
              {
                header: "Department",
                render: (d) => getDoctorDepartment(d) ?? "—",
              },
            ]}
            rows={doctors.data?.slice(0, 5)}
            isLoading={doctors.isLoading}
            error={doctors.error}
            getKey={(d) => d.id}
            emptyMessage="No doctors found."
          />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h2 className="font-bold text-slate-900">Recent Appointments</h2>
            <Link
              to="/admin/appointments"
              className="text-sm font-medium text-sky-600 hover:text-sky-700"
            >
              View all
            </Link>
          </div>

          <AdminTable
            columns={[
              {
                header: "Patient",
                render: (a) => a.patient?.name ?? a.user?.name ?? "—",
              },
              { header: "Doctor", render: (a) => a.doctor?.name ?? `#${a.doctorId}` },
              { header: "Date", render: (a) => formatDateTime(a.appointmentDate) },
              { header: "Status", render: (a) => <StatusBadge status={a.status} /> },
            ]}
            rows={appointments.data?.slice(0, 5)}
            isLoading={appointments.isLoading}
            error={appointments.error}
            getKey={(a) => a.id}
            emptyMessage="No appointments yet."
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
