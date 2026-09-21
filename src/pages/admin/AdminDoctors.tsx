import { Link } from "react-router-dom";
import { useAdminDoctors } from "../../hooks/useAdminData";
import AdminTable from "../../components/admin/AdminTable";
import { getDoctorDepartment, getDoctorName } from "../../utils/adminDoctor";

const AdminDoctors = () => {
  const { data, isLoading, error } = useAdminDoctors();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Doctors
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {data ? `${data.length} doctors` : "All registered doctors."}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white">
        <AdminTable
          columns={[
            {
              header: "Doctor",
              render: (d) => (
                <div className="flex items-center gap-3">
                  {d.imageUrl ? (
                    <img
                      src={d.imageUrl}
                      alt={getDoctorName(d)}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-700">
                      {getDoctorName(d).replace(/^Dr\.?\s*/i, "").charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-slate-900">
                      {getDoctorName(d)}
                    </p>
                    <p className="text-xs text-slate-500">{d.user?.email}</p>
                  </div>
                </div>
              ),
            },
            { header: "Specialization", render: (d) => d.specialization ?? "—" },
            { header: "Department", render: (d) => getDoctorDepartment(d) ?? "—" },
            {
              header: "Experience",
              render: (d) =>
                d.experience != null ? `${d.experience} yrs` : "—",
            },
            { header: "License", render: (d) => d.licenseNumber ?? "—" },
            {
              header: "Status",
              render: (d) => (
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    d.isAvailable
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {d.isAvailable ? "Available" : "Unavailable"}
                </span>
              ),
            },
            {
              header: "",
              render: (d) => (
                <Link
                  to={`/admin/doctors/${d.id}`}
                  className="font-medium text-sky-600 hover:text-sky-700"
                >
                  Edit
                </Link>
              ),
            },
          ]}
          rows={data}
          isLoading={isLoading}
          error={error}
          getKey={(d) => d.id}
          emptyMessage="No doctors found."
        />
      </div>
    </div>
  );
};

export default AdminDoctors;
