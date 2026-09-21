import {
  useAdminAppointments,
  useConfirmAppointment,
  useUpdateAppointmentStatus,
} from "../../hooks/useAdminData";
import AdminTable from "../../components/admin/AdminTable";
import StatusBadge from "../../components/admin/StatusBadge";
import { formatDateTime } from "../../utils/dates";
import { getErrorMessage } from "../../utils/errors";

const AdminAppointments = () => {
  const { data, isLoading, error } = useAdminAppointments();
  const confirmMutation = useConfirmAppointment();
  const statusMutation = useUpdateAppointmentStatus();

  const isBusy = confirmMutation.isPending || statusMutation.isPending;
  const actionError = confirmMutation.error ?? statusMutation.error;

  const handleCancel = (id: number) => {
    if (window.confirm("Cancel this appointment?")) {
      statusMutation.mutate({ id, status: "CANCELLED" });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Appointments
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {data ? `${data.length} appointments` : "All booked appointments."}
        </p>
      </div>

      {actionError && (
        <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">
          {getErrorMessage(actionError)}
        </p>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white">
        <AdminTable
          columns={[
            { header: "ID", render: (a) => a.id },
            {
              header: "Patient",
              render: (a) => (
                <div>
                  <p className="font-medium text-slate-900">
                    {a.patient?.name ?? a.user?.name ?? "—"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {a.patient?.email ?? a.user?.email ?? ""}
                  </p>
                </div>
              ),
            },
            {
              header: "Doctor",
              render: (a) =>
                a.doctor?.user?.name ?? a.doctor?.name ?? `Doctor #${a.doctorId}`,
            },
            { header: "Date", render: (a) => formatDateTime(a.appointmentDate) },
            { header: "Reason", render: (a) => a.reason ?? "—" },
            { header: "Status", render: (a) => <StatusBadge status={a.status} /> },
            {
              header: "Actions",
              render: (a) => {
                const status = a.status.toUpperCase();
                const canApprove = status === "PENDING";
                const canCancel = status === "PENDING" || status === "CONFIRMED";

                if (!canApprove && !canCancel) {
                  return <span className="text-slate-400">—</span>;
                }

                return (
                  <div className="flex items-center gap-2">
                    {canApprove && (
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => confirmMutation.mutate(a.id)}
                        className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Approve
                      </button>
                    )}
                    {canCancel && (
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => handleCancel(a.id)}
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                );
              },
            },
          ]}
          rows={data}
          isLoading={isLoading}
          error={error}
          getKey={(a) => a.id}
          emptyMessage="No appointments yet."
        />
      </div>
    </div>
  );
};

export default AdminAppointments;
