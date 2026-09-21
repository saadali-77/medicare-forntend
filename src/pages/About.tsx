import { Link } from "react-router-dom";
import {
  CalendarDays,
  Eye,
  HandHeart,
  HeartPulse,
  Pill,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  Users,
} from "lucide-react";
import { hospital } from "../data/hospital";

const eyebrowClass =
  "inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-700";

const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

const stats = [
  { value: String(hospital.established), label: "Serving patients since" },
  { value: "50+", label: "Specialist doctors" },
  { value: "15K+", label: "Patients treated" },
  { value: "24/7", label: "Emergency care" },
];

const services = [
  {
    title: "Specialist Doctors",
    description:
      "Experienced doctors across cardiology, neurology, pediatrics, dermatology and more.",
    icon: Stethoscope,
    to: "/doctors",
  },
  {
    title: "Online Appointments",
    description:
      "Choose your doctor, pick a date and time, and book a visit in minutes.",
    icon: CalendarDays,
    to: "/appointments",
  },
  {
    title: "Online Pharmacy",
    description:
      "Order genuine medicines and healthcare products and get them delivered.",
    icon: Pill,
    to: "/pharmacy",
  },
  {
    title: "Emergency Care",
    description:
      "Round-the-clock emergency services with a trained team ready at all times.",
    icon: HeartPulse,
    to: "/contact",
  },
];

const values = [
  {
    title: "Compassion",
    description: "We treat every patient with empathy, dignity and respect.",
    icon: HandHeart,
  },
  {
    title: "Excellence",
    description: "We hold our care and our people to the highest standards.",
    icon: Sparkles,
  },
  {
    title: "Integrity",
    description: "Honest communication and clear, fair treatment decisions.",
    icon: ShieldCheck,
  },
  {
    title: "Community",
    description: "Accessible healthcare that supports families and neighbourhoods.",
    icon: Users,
  },
];

const About = () => {
  return (
    <div>
      {/* Header */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <span className={eyebrowClass}>About Us</span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            About {hospital.name}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            For more than {new Date().getFullYear() - hospital.established}{" "}
            years we have combined experienced doctors, modern facilities and an
            online pharmacy to make quality healthcare easy to reach.
          </p>
        </div>
      </section>

      {/* Story + stats */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className={eyebrowClass}>Our Story</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Care built around the patient
            </h2>
            <div className="mt-5 space-y-4 leading-7 text-slate-600">
              <p>
                {hospital.name} was founded in {hospital.established} with a
                simple goal: give every patient a trusted place to receive
                complete care, from the first consultation to the medicines that
                follow.
              </p>
              <p>
                Today our specialists cover a wide range of departments, and our
                online platform lets you find a doctor, book an appointment and
                order your medicines from home, so you spend less time waiting
                and more time recovering.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-center"
              >
                <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-20 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Target size={24} />
            </div>
            <h3 className="mt-5 text-xl font-bold text-slate-900">Our Mission</h3>
            <p className="mt-3 leading-7 text-slate-600">
              To deliver safe, compassionate and affordable healthcare, and to
              make every step of a patient's journey simple, from booking a
              doctor to receiving medicine.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Eye size={24} />
            </div>
            <h3 className="mt-5 text-xl font-bold text-slate-900">Our Vision</h3>
            <p className="mt-3 leading-7 text-slate-600">
              To be the most trusted hospital and pharmacy in our community,
              known for clinical excellence and for putting patients first.
            </p>
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <span className={eyebrowClass}>What We Offer</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Everything you need in one place
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ title, description, icon: Icon, to }) => (
            <Link
              key={title}
              to={to}
              className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Icon size={24} />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center">
            <span className={eyebrowClass}>Our Values</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              What guides us every day
            </h2>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ title, description, icon: Icon }) => (
              <div key={title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Icon size={24} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-3xl bg-slate-900 px-8 py-14 text-center text-white md:px-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Ready to take care of your health?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Meet our doctors and book an appointment today, or get in touch and
            we'll be happy to help.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/appointments" className={primaryButtonClass}>
              Book an Appointment
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-slate-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
