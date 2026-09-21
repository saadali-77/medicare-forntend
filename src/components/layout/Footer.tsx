import { Link } from "react-router-dom";
import { Clock3, HeartPulse, Mail, MapPin, Phone } from "lucide-react";
import { hospital } from "../../data/hospital";

const quickLinks = [
  { to: "/doctors", label: "Our Doctors" },
  { to: "/appointments", label: "Book Appointment" },
  { to: "/pharmacy", label: "Online Pharmacy" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

const accountLinks = [
  { to: "/login", label: "Sign In" },
  { to: "/register", label: "Create Account" },
  { to: "/my-appointments", label: "My Appointments" },
  { to: "/cart", label: "My Cart" },
];

const linkClass = "text-slate-400 transition hover:text-white";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-sm text-slate-400">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <HeartPulse size={20} />
            </span>
            <span className="text-lg font-bold tracking-tight text-white">
              Medicare<span className="text-blue-400">Hospital</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs leading-6">
            Quality healthcare and a trusted online pharmacy, all in one place.
            Caring for our community since {hospital.established}.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white">Quick Links</h3>
          <ul className="mt-4 space-y-3">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white">Patient Area</h3>
          <ul className="mt-4 space-y-3">
            {accountLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white">Contact</h3>
          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-blue-400" />
              {hospital.address}
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="shrink-0 text-blue-400" />
              {hospital.phone}
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="shrink-0 text-blue-400" />
              {hospital.email}
            </li>
            <li className="flex items-start gap-3">
              <Clock3 size={16} className="mt-0.5 shrink-0 text-blue-400" />
              <span>
                {hospital.hours[0].days}: {hospital.hours[0].time}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs sm:flex-row">
          <p>
            © {year} {hospital.name}. All rights reserved.
          </p>
          <p>Your health, our priority.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
