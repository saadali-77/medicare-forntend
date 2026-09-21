import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { siteDepartments } from "../data/departments";

const eyebrowClass =
  "inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-700";

const Departments = () => (
  <div>
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <span className={eyebrowClass}>Our Departments</span>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Specialized Healthcare
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Explore our medical departments to see what we treat and the doctors
          who can help you.
        </p>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {siteDepartments.map((department) => {
          const Icon = department.icon;

          return (
            <Link
              key={department.slug}
              to={`/departments/${department.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Icon size={24} />
              </div>

              <h2 className="mt-5 text-lg font-bold text-slate-900">
                {department.name}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {department.tagline}
              </p>

              <span className="mt-5 flex items-center gap-2 text-sm font-semibold text-blue-600 transition group-hover:gap-3">
                Learn More
                <ArrowRight size={16} />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  </div>
);

export default Departments;
