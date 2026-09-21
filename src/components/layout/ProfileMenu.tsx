import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Shield, ShoppingCart, User } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import LogoutButton from "../auth/LogoutButton";

const itemClass =
  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-blue-600";

const ProfileMenu = () => {
  const { user, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  if (!user) return null;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-blue-600 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        aria-label="Open profile menu"
        aria-expanded={open}
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.fullName}
            className="h-full w-full object-cover"
          />
        ) : (
          user.fullName.charAt(0).toUpperCase()
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
          <div className="border-b border-slate-100 px-3 pt-2 pb-3">
            <p className="truncate text-sm font-semibold text-slate-900">
              {user.fullName}
            </p>
            <p className="truncate text-xs text-slate-500">{user.email}</p>
          </div>

          <div className="mt-2 space-y-1">
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className={itemClass}
              >
                <Shield size={16} />
                Admin Panel
              </Link>
            )}
            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className={itemClass}
            >
              <User size={16} />
              My Profile
            </Link>
            <Link
              to="/my-appointments"
              onClick={() => setOpen(false)}
              className={itemClass}
            >
              <CalendarDays size={16} />
              My Appointments
            </Link>
            <Link
              to="/cart"
              onClick={() => setOpen(false)}
              className={itemClass}
            >
              <ShoppingCart size={16} />
              My Cart
              {cartCount > 0 && (
                <span className="ml-auto rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <div className="mt-2 border-t border-slate-100 pt-2">
            <LogoutButton className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-red-600" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
