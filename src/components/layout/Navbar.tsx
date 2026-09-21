import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HeartPulse, Menu, ShoppingCart, User, X } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import ProfileMenu from "./ProfileMenu";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/doctors", label: "Doctors" },
  { to: "/appointments", label: "Appointments" },
  { to: "/pharmacy", label: "Pharmacy" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-blue-50 text-blue-700"
      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
  }`;

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
    isActive
      ? "bg-blue-50 text-blue-700"
      : "text-slate-700 hover:bg-slate-50"
  }`;

function Navbar() {
  const { cartCount } = useCart();
  const { isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
        <Link to="/" className="flex items-center gap-2.5" onClick={closeMenu}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <HeartPulse size={20} />
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Medicare<span className="text-blue-600">Hospital</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === "/"} className={desktopLinkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <ProfileMenu />
          ) : (
            <Link
              to="/login"
              className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 sm:inline-flex"
            >
              <User size={18} />
              Sign In
            </Link>
          )}

          <Link
            to="/cart"
            className="relative rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
            aria-label="View cart"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            to="/appointments"
            className="hidden rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md sm:inline-flex"
          >
            Book Appointment
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-50 lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-6 pt-3 pb-5 lg:hidden">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  onClick={closeMenu}
                  className={mobileLinkClass}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-4 grid gap-3 sm:hidden">
            <Link
              to="/appointments"
              onClick={closeMenu}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
            >
              Book Appointment
            </Link>
            {!isAuthenticated && (
              <Link
                to="/login"
                onClick={closeMenu}
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
