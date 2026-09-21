import { Link, NavLink } from 'react-router-dom'
import { ShoppingCart, User } from 'lucide-react'
import { useCart } from '../../hooks/useCart'
import { useAuth } from '../../hooks/useAuth'
import ProfileMenu from './ProfileMenu'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/doctors', label: 'Doctors' },
  { to: '/appointments', label: 'Appointments' },
  { to: '/pharmacy', label: 'Pharmacy' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function Navbar() {
  const { cartCount } = useCart()
  const { isAuthenticated } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold text-sky-600">
          Medicare<span className="text-slate-900">Hospital</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-sky-600 ${
                    isActive ? 'text-sky-600' : 'text-slate-600'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <ProfileMenu />
          ) : (
            <Link
              to="/login"
              className="text-slate-600 transition-colors hover:text-sky-600"
              aria-label="Sign in"
            >
              <User size={22} />
            </Link>
          )}

          <Link
            to="/cart"
            className="relative text-slate-600 transition-colors hover:text-sky-600"
            aria-label="View cart"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-sky-600 px-1 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            to="/appointments"
            className="rounded-full bg-sky-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky-700"
          >
            Book Appointment
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
