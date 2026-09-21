import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useDoctors } from "../hooks/useDoctors";
import DoctorCard from "../components/doctors/DoctorCard";
import { getDoctorName } from "../utils/adminDoctor";
import { getErrorMessage } from "../utils/errors";

const eyebrowClass =
  "inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-700";

const Doctors = () => {
  const { data: doctors, isLoading, error } = useDoctors();
  const [query, setQuery] = useState("");
  const [specialization, setSpecialization] = useState("All");

  const specializations = useMemo(
    () => [
      "All",
      ...new Set(
        (doctors ?? [])
          .map((doctor) => doctor.specialization)
          .filter((value): value is string => Boolean(value)),
      ),
    ],
    [doctors],
  );

  const filteredDoctors = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return (doctors ?? []).filter((doctor) => {
      const matchesSpecialization =
        specialization === "All" || doctor.specialization === specialization;

      const matchesQuery =
        normalizedQuery.length === 0 ||
        getDoctorName(doctor).toLowerCase().includes(normalizedQuery) ||
        (doctor.specialization ?? "").toLowerCase().includes(normalizedQuery);

      return matchesSpecialization && matchesQuery;
    });
  }, [doctors, query, specialization]);

  return (
    <div>
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <span className={eyebrowClass}>Our Doctors</span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Meet Our Specialists
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Experienced, board-certified doctors across every major
            specialty — ready to give you the care you need.
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search
              size={18}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name or specialization..."
              className="w-full rounded-lg border border-slate-300 py-2.5 pr-4 pl-10 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {specializations.map((entry) => (
              <button
                key={entry}
                type="button"
                onClick={() => setSpecialization(entry)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  specialization === entry
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {entry}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        {isLoading ? (
          <p className="py-20 text-center text-slate-500">Loading doctors...</p>
        ) : error ? (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-center text-sm text-red-700">
            {getErrorMessage(error)}
          </p>
        ) : filteredDoctors.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 py-20 text-center">
            <p className="text-lg font-semibold text-slate-900">
              No doctors found
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Try a different search term or specialization.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Doctors;
