import { Link, NavLink, Outlet } from "react-router-dom";
import {
  CalendarDays,
  ExternalLink,
  LayoutDashboard,
  Stethoscope,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import LogoutButton from "../components/auth/LogoutButton";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/doctors", label: "Doctors", icon: Stethoscope },
  { to: "/admin/appointments", label: "Appointments", icon: CalendarDays },
];

const AdminLayout = () => {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 md:flex-row">
      <aside className="border-b border-slate-200 bg-white md:w-64 md:shrink-0 md:border-r md:border-b-0">
        <div className="flex items-center justify-between px-6 py-5 md:block">
          <Link to="/admin" className="text-xl font-bold text-sky-600">
            Medicare<span className="text-slate-900">Admin</span>
          </Link>
        </div>

        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:pb-0">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition ${
                  isActive
                    ? "bg-sky-50 text-sky-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              {user?.fullName}
            </p>
            <p className="truncate text-xs text-slate-500">{user?.email}</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-sky-600 sm:inline-flex"
            >
              <ExternalLink size={16} />
              View Site
            </Link>
            <LogoutButton />
          </div>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
