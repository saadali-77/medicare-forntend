import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Clock3, HeartPulse, Mail, MapPin, Phone } from "lucide-react";
import { hospital } from "../data/hospital";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Please enter a subject"),
  message: z.string().min(10, "Please write at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const eyebrowClass =
  "inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-700";

const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

const inputClass =
  "w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20";

const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";
const errorClass = "mt-1 text-xs text-red-600";

const contactCards = [
  { icon: MapPin, title: "Visit Us", lines: [hospital.address] },
  { icon: Phone, title: "Call Us", lines: [hospital.phone] },
  { icon: Mail, title: "Email Us", lines: [hospital.email] },
];

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (values: ContactFormValues) => {
    const body = [
      values.message,
      "",
      `From: ${values.name}`,
      `Email: ${values.email}`,
      values.phone ? `Phone: ${values.phone}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `mailto:${hospital.email}?subject=${encodeURIComponent(
        values.subject,
      )}&body=${encodeURIComponent(body)}`,
      "_self",
    );
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <span className={eyebrowClass}>Contact</span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Get in Touch
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Questions about an appointment, a doctor or your medicines? Reach
            out to {hospital.name} and our team will help.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        {/* Contact cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {contactCards.map(({ icon: Icon, title, lines }) => (
            <div
              key={title}
              className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Icon size={22} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{title}</h3>
                {lines.map((line) => (
                  <p key={line} className="mt-1 text-sm text-slate-600">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <h2 className="text-xl font-bold text-slate-900">Send us a message</h2>
            <p className="mt-1 text-sm text-slate-500">
              Submitting opens your email app with your message ready to send to
              our team.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="mt-8 space-y-6"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="name">
                    Full Name
                  </label>
                  <input
                    id="name"
                    placeholder="John Doe"
                    className={inputClass}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className={errorClass}>{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className={labelClass} htmlFor="email">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className={inputClass}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className={errorClass}>{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="phone">
                    Phone (optional)
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className={inputClass}
                    {...register("phone")}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="subject">
                    Subject
                  </label>
                  <input
                    id="subject"
                    placeholder="How can we help?"
                    className={inputClass}
                    {...register("subject")}
                  />
                  {errors.subject && (
                    <p className={errorClass}>{errors.subject.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className={inputClass}
                  {...register("message")}
                />
                {errors.message && (
                  <p className={errorClass}>{errors.message.message}</p>
                )}
              </div>

              <button type="submit" className={primaryButtonClass}>
                Send Message
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                <Clock3 size={18} className="text-blue-600" />
                Working Hours
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {hospital.hours.map(({ days, time }) => (
                  <li key={days} className="flex items-center justify-between gap-4">
                    <span>{days}</span>
                    <span className="font-medium text-slate-900">{time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white shadow-lg shadow-blue-600/20">
              <h3 className="flex items-center gap-2 text-lg font-bold">
                <HeartPulse size={20} />
                Emergency?
              </h3>
              <p className="mt-2 text-sm text-blue-100">
                Our emergency team is available 24 hours a day, 7 days a week.
              </p>
              <p className="mt-4 text-2xl font-bold">{hospital.emergencyPhone}</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default Contact;
