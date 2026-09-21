import { Link } from 'react-router-dom'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-sky-600">
            Medicare<span className="text-slate-900">Hospital</span>
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Quality healthcare and pharmacy services, all in one place.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <Link to="/appointments" className="hover:text-sky-600">
                Book Appointment
              </Link>
            </li>
            <li>
              <Link to="/pharmacy" className="hover:text-sky-600">
                Pharmacy
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-sky-600">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-sky-600">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>123 Health Ave, Wellness City</li>
            <li>+1 (555) 123-4567</li>
            <li>support@medicarehospital.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        © {year} MedicareHospital. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
