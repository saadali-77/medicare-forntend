import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  HeartPulse,
  ShieldCheck,
  ShoppingCart,
  Stethoscope,
} from "lucide-react";
import { siteDepartments } from "../data/departments";
import { useDoctors } from "../hooks/useDoctors";
import DoctorCard, {
  DoctorCardSkeleton,
  DoctorPhoto,
} from "../components/doctors/DoctorCard";


const primaryButtonClass =
  "inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

const secondaryButtonClass =
  "inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

const eyebrowClass =
  "inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-700";

const Home = () => {
  const doctorsQuery = useDoctors();
  const featuredDoctors = (doctorsQuery.data ?? []).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-50">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            <div className={`mb-5 ${eyebrowClass}`}>
              <ShieldCheck size={16} />
              Trusted Healthcare Since 2005
            </div>

            <h1 className="text-5xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">
              Your Health,
              <br />
              <span className="text-blue-600">Our Priority.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Get quality healthcare from experienced doctors, book
              appointments online, and order medicines from our trusted
              online pharmacy.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/appointments" className={primaryButtonClass}>
                <CalendarDays size={19} />
                Book Appointment
              </Link>

              <Link to="/doctors" className={secondaryButtonClass}>
                Find a Doctor
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-8">
              <div>
                <p className="text-2xl font-bold text-slate-900">50+</p>
                <p className="text-sm text-slate-500">Specialist Doctors</p>
              </div>

              <div>
                <p className="text-2xl font-bold text-slate-900">15K+</p>
                <p className="text-sm text-slate-500">Happy Patients</p>
              </div>

              <div>
                <p className="text-2xl font-bold text-slate-900">24/7</p>
                <p className="text-sm text-slate-500">Emergency Care</p>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-xl shadow-blue-600/20">
              <img
                src="/images/hero-hospital.svg"
                alt="Medicare Hospital building"
                className="aspect-[5/4] w-full object-cover"
              />
            </div>

            <div className="absolute -bottom-5 -left-5 rounded-2xl bg-white p-5 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-green-100 p-3 text-green-600">
                  <Clock3 size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Emergency Care
                  </p>
                  <p className="text-xs text-slate-500">Available 24/7</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-5 -right-5 rounded-2xl bg-white p-5 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {featuredDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className="h-10 w-10 overflow-hidden rounded-full border-2 border-white"
                    >
                      <DoctorPhoto doctor={doctor} />
                    </div>
                  ))}
                  {featuredDoctors.length === 0 && (
                    <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                      <ShieldCheck size={20} />
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Expert Doctors
                  </p>
                  <p className="text-xs text-slate-500">Ready to help you</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Services */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/appointments"
            className="flex items-center gap-4 rounded-xl border border-transparent p-4 transition hover:border-slate-200 hover:bg-slate-50"
          >
            <CalendarDays className="shrink-0 text-blue-600" />
            <div>
              <h3 className="font-semibold text-slate-900">
                Book Appointment
              </h3>
              <p className="text-sm text-slate-500">Schedule with a doctor</p>
            </div>
          </Link>

          <Link
            to="/doctors"
            className="flex items-center gap-4 rounded-xl border border-transparent p-4 transition hover:border-slate-200 hover:bg-slate-50"
          >
            <Stethoscope className="shrink-0 text-blue-600" />
            <div>
              <h3 className="font-semibold text-slate-900">Find a Doctor</h3>
              <p className="text-sm text-slate-500">Browse our specialists</p>
            </div>
          </Link>

          <Link
            to="/pharmacy"
            className="flex items-center gap-4 rounded-xl border border-transparent p-4 transition hover:border-slate-200 hover:bg-slate-50"
          >
            <ShoppingCart className="shrink-0 text-blue-600" />
            <div>
              <h3 className="font-semibold text-slate-900">
                Online Pharmacy
              </h3>
              <p className="text-sm text-slate-500">Order medicines online</p>
            </div>
          </Link>

          <Link
            to="/contact"
            className="flex items-center gap-4 rounded-xl border border-transparent p-4 transition hover:border-slate-200 hover:bg-slate-50"
          >
            <HeartPulse className="shrink-0 text-blue-600" />
            <div>
              <h3 className="font-semibold text-slate-900">Emergency Care</h3>
              <p className="text-sm text-slate-500">
                Available around the clock
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Departments */}
      <section id="departments" className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className={eyebrowClass}>Our Departments</span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Specialized Healthcare
            </h2>

            <p className="mt-3 max-w-2xl text-slate-600">
              Our specialists provide comprehensive treatment across multiple
              medical departments.
            </p>
          </div>

          <Link
            to="/departments"
            className="flex items-center gap-2 font-semibold text-blue-600 transition hover:text-blue-700"
          >
            View All Departments
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {siteDepartments.slice(0, 4).map((department) => {
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

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {department.name}
                </h3>

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

      {/* Doctors */}
      <section id="doctors" className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center">
            <span className={eyebrowClass}>Our Doctors</span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Meet Our Specialists
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              Experienced healthcare professionals dedicated to providing
              personalized patient care.
            </p>

            <Link
              to="/doctors"
              className="mt-4 inline-flex items-center gap-2 font-semibold text-blue-600 transition hover:text-blue-700"
            >
              View All Doctors
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {doctorsQuery.isLoading &&
              [0, 1, 2].map((item) => <DoctorCardSkeleton key={item} />)}
            {featuredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>

      {/* Pharmacy */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-12 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 px-8 py-12 text-white shadow-xl shadow-blue-600/20 md:grid-cols-2 md:px-14">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-200">
              Online Pharmacy
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Your Medicines, Delivered to Your Door
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-blue-100">
              Browse our collection of medicines, vitamins and healthcare
              products and order them from the comfort of your home.
            </p>

            <Link
              to="/pharmacy"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600"
            >
              <ShoppingCart size={19} />
              Shop Medicines
            </Link>
          </div>

          <div className="flex justify-center">
            <img
              src="/images/pharmacy-shelves.svg"
              alt="Pharmacy shelves with medicines"
              className="w-full max-w-md"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center">
            <span className={eyebrowClass}>Why Medicare</span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Healthcare Built Around You
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Stethoscope />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Experienced Doctors
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Connect with qualified healthcare professionals across
                multiple specialties.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <ShieldCheck />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Trusted Healthcare
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Patient-focused services designed around quality, privacy and
                convenience.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Clock3 />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                24/7 Support
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Emergency services and support whenever you need them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-3xl bg-slate-900 px-8 py-14 text-center text-white md:px-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Ready to Take Care of Your Health?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Book an appointment with one of our specialists and take the next
            step toward better healthcare.
          </p>

          <Link
            to="/appointments"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            Book an Appointment
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
