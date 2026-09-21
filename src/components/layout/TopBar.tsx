import { Clock3, Mail, Phone } from "lucide-react";
import { hospital } from "../../data/hospital";

const TopBar = () => (
  <div className="bg-slate-900 text-xs text-slate-300">
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2">
      <a
        href={`tel:${hospital.emergencyPhone.replace(/[^\d+]/g, "")}`}
        className="inline-flex items-center gap-2 transition hover:text-white"
      >
        <Phone size={13} />
        <span>
          24/7 Emergency:{" "}
          <span className="font-semibold text-white">
            {hospital.emergencyPhone}
          </span>
        </span>
      </a>

      <div className="hidden items-center gap-6 sm:flex">
        <span className="inline-flex items-center gap-2">
          <Clock3 size={13} />
          {hospital.hours[0].days}: {hospital.hours[0].time}
        </span>
        <a
          href={`mailto:${hospital.email}`}
          className="inline-flex items-center gap-2 transition hover:text-white"
        >
          <Mail size={13} />
          {hospital.email}
        </a>
      </div>
    </div>
  </div>
);

export default TopBar;
