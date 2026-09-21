import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";
import {
  useAdminDoctors,
  useDepartments,
  useUpdateAdminDoctor,
} from "../../hooks/useAdminData";
import { getErrorMessage } from "../../utils/errors";
import {
  getDoctorDepartmentId,
  getDoctorName,
} from "../../utils/adminDoctor";
import type { AdminDoctor } from "../../Api/admin.api";

const optionalNumber = (value: unknown) =>
  value === "" || value === null || value === undefined
    ? undefined
    : Number(value);

const doctorSchema = z.object({
  specialization: z.string().optional(),
  qualification: z.string().optional(),
  experience: z
    .number("Enter a whole number")
    .int("Enter a whole number")
    .min(0, "Must be 0 or more")
    .optional(),
  licenseNumber: z.string().optional(),
  bio: z.string().optional(),
  departmentId: z
    .number("Choose a department")
    .int("Enter a whole number")
    .optional(),
  imageUrl: z.string().url("Enter a valid URL").optional().or(z.literal("")),
});

type DoctorFormValues = z.infer<typeof doctorSchema>;

const inputClass =
  "w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20";
const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";
const errorClass = "mt-1 text-xs text-red-600";

const emptyToUndefined = (value?: string) => value?.trim() || undefined;

const DoctorForm = ({ doctor }: { doctor: AdminDoctor }) => {
  const navigate = useNavigate();
  const updateMutation = useUpdateAdminDoctor();
  const departments = useDepartments();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      specialization: doctor.specialization ?? "",
      qualification: doctor.qualification ?? "",
      experience: doctor.experience ?? undefined,
      licenseNumber: doctor.licenseNumber ?? "",
      bio: doctor.bio ?? "",
      departmentId: getDoctorDepartmentId(doctor),
      imageUrl: doctor.imageUrl ?? "",
    },
  });

  const onSubmit = (values: DoctorFormValues) => {
    updateMutation.mutate(
      {
        id: doctor.id,
        payload: {
          specialization: emptyToUndefined(values.specialization),
          qualification: emptyToUndefined(values.qualification),
          experience: values.experience,
          licenseNumber: emptyToUndefined(values.licenseNumber),
          bio: emptyToUndefined(values.bio),
          departmentId: values.departmentId,
          imageUrl: emptyToUndefined(values.imageUrl),
        },
      },
      { onSuccess: () => navigate("/admin/doctors") },
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 md:p-8"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="specialization">Specialization</label>
          <input id="specialization" className={inputClass} {...register("specialization")} />
        </div>

        <div>
          <label className={labelClass} htmlFor="qualification">Qualification</label>
          <input id="qualification" className={inputClass} {...register("qualification")} />
        </div>

        <div>
          <label className={labelClass} htmlFor="experience">Experience (years)</label>
          <input
            id="experience"
            type="number"
            step={1}
            className={inputClass}
            {...register("experience", { setValueAs: optionalNumber })}
          />
          {errors.experience && (
            <p className={errorClass}>{errors.experience.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass} htmlFor="licenseNumber">License Number</label>
          <input id="licenseNumber" className={inputClass} {...register("licenseNumber")} />
        </div>

        <div>
          <label className={labelClass} htmlFor="departmentId">Department</label>
          {departments.data && departments.data.length > 0 ? (
            <select
              id="departmentId"
              className={inputClass}
              {...register("departmentId", { setValueAs: optionalNumber })}
            >
              <option value="">Select department</option>
              {departments.data.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          ) : (
            <p className="rounded-lg bg-slate-50 px-4 py-2.5 text-sm text-slate-500">
              {departments.isLoading
                ? "Loading departments..."
                : "No departments available to choose from."}
            </p>
          )}
          {errors.departmentId && (
            <p className={errorClass}>{errors.departmentId.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass} htmlFor="imageUrl">Image URL</label>
          <input
            id="imageUrl"
            placeholder="https://..."
            className={inputClass}
            {...register("imageUrl")}
          />
          {errors.imageUrl && (
            <p className={errorClass}>{errors.imageUrl.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          rows={4}
          placeholder="A short introduction shown on the doctor's profile"
          className={inputClass}
          {...register("bio")}
        />
      </div>

      {updateMutation.isError && (
        <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">
          {getErrorMessage(updateMutation.error)}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={updateMutation.isPending}
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {updateMutation.isPending ? "Saving..." : "Save Changes"}
        </button>
        <Link
          to="/admin/doctors"
          className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
};

const AdminDoctorEdit = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useAdminDoctors();
  const doctor = data?.find((entry) => String(entry.id) === id);

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <Link
          to="/admin/doctors"
          className="inline-flex items-center gap-2 text-sm font-medium text-sky-600 hover:text-sky-700"
        >
          <ArrowLeft size={16} />
          Back to Doctors
        </Link>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
          {doctor ? `Edit ${getDoctorName(doctor)}` : "Edit Doctor"}
        </h1>
      </div>

      {isLoading ? (
        <p className="text-sm text-slate-500">Loading...</p>
      ) : error ? (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {getErrorMessage(error)}
        </p>
      ) : !doctor ? (
        <p className="text-sm text-slate-500">Doctor not found.</p>
      ) : (
        <DoctorForm doctor={doctor} />
      )}
    </div>
  );
};

export default AdminDoctorEdit;
