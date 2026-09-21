import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  Minus,
  PackageX,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { medicines } from "../data/medicines";
import { useCart } from "../hooks/useCart";
import { currency } from "../utils/currency";

const eyebrowClass =
  "inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-700";

const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

const inputClass =
  "w-full rounded-lg border border-slate-300 py-2.5 pr-4 pl-10 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20";

const Pharmacy = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const {
    cartDetails,
    cartCount,
    cartSubtotal,
    getQuantity,
    addToCart,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const categories = useMemo(
    () => ["All", ...new Set(medicines.map((medicine) => medicine.category))],
    [],
  );

  const filteredMedicines = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return medicines.filter((medicine) => {
      const matchesCategory =
        category === "All" || medicine.category === category;

      const matchesQuery =
        normalizedQuery.length === 0 ||
        medicine.name.toLowerCase().includes(normalizedQuery) ||
        medicine.description.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div>
      {/* Header */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <span className={eyebrowClass}>Online Pharmacy</span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Order Medicines Online
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Browse medicines, vitamins and healthcare essentials, and get them
            delivered straight to your door.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search
              size={18}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search medicines..."
              className={inputClass}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((entry) => (
              <button
                key={entry}
                type="button"
                onClick={() => setCategory(entry)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  category === entry
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {entry}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
          {/* Medicines grid */}
          <div>
            {filteredMedicines.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 py-20 text-center">
                <p className="text-lg font-semibold text-slate-900">
                  No medicines found
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Try a different search term or category filter.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredMedicines.map((medicine) => {
                  const quantity = getQuantity(medicine.id);

                  return (
                    <div
                      key={medicine.id}
                      className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <Link
                        to={`/pharmacy/${medicine.id}`}
                        className="relative block h-48 overflow-hidden bg-blue-100"
                      >
                        <img
                          src={medicine.image}
                          alt={medicine.name}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />

                        {medicine.prescriptionRequired && (
                          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
                            <AlertCircle size={12} />
                            Rx Required
                          </span>
                        )}

                        {!medicine.inStock && (
                          <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700">
                            <PackageX size={12} />
                            Out of Stock
                          </span>
                        )}
                      </Link>

                      <div className="flex flex-1 flex-col p-6">
                        <span className="inline-flex w-fit items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                          {medicine.category}
                        </span>

                        <h3 className="mt-4 text-lg font-bold text-slate-900">
                          <Link
                            to={`/pharmacy/${medicine.id}`}
                            className="transition hover:text-blue-600"
                          >
                            {medicine.name}
                          </Link>
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          {medicine.description}
                        </p>

                        <p className="mt-3 text-xs text-slate-400">
                          {medicine.manufacturer} · {medicine.unit}
                        </p>

                        <div className="mt-4 flex flex-1 items-end justify-between gap-3">
                          <p className="text-xl font-bold text-slate-900">
                            {currency(medicine.price)}
                          </p>

                          {!medicine.inStock ? (
                            <button
                              type="button"
                              disabled
                              className={primaryButtonClass}
                            >
                              Unavailable
                            </button>
                          ) : quantity > 0 ? (
                            <div className="flex items-center gap-3 rounded-lg border border-slate-300 px-2 py-1.5">
                              <button
                                type="button"
                                onClick={() => updateQuantity(medicine.id, -1)}
                                className="flex h-6 w-6 items-center justify-center rounded text-slate-600 transition hover:bg-slate-100"
                                aria-label={`Decrease ${medicine.name} quantity`}
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-4 text-center text-sm font-semibold text-slate-900">
                                {quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(medicine.id, 1)}
                                className="flex h-6 w-6 items-center justify-center rounded text-slate-600 transition hover:bg-slate-100"
                                aria-label={`Increase ${medicine.name} quantity`}
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => addToCart(medicine.id)}
                              className={primaryButtonClass}
                            >
                              <ShoppingCart size={16} />
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Cart */}
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 lg:sticky lg:top-24">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                <ShoppingCart size={20} className="text-blue-600" />
                Your Cart
              </h3>
              {cartCount > 0 && (
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                  {cartCount} {cartCount === 1 ? "item" : "items"}
                </span>
              )}
            </div>

            {cartDetails.length === 0 ? (
              <p className="mt-6 text-sm text-slate-500">
                Your cart is empty. Add medicines to get started.
              </p>
            ) : (
              <>
                <ul className="mt-6 space-y-4">
                  {cartDetails.map(({ medicine, quantity }) => (
                    <li
                      key={medicine.id}
                      className="flex items-start justify-between gap-3"
                    >
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {medicine.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {quantity} × {currency(medicine.price)}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <p className="text-sm font-semibold text-slate-900">
                          {currency(medicine.price * quantity)}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeFromCart(medicine.id)}
                          className="text-slate-400 transition hover:text-red-600"
                          aria-label={`Remove ${medicine.name} from cart`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
                  <span className="text-sm font-medium text-slate-600">
                    Subtotal
                  </span>
                  <span className="text-lg font-bold text-slate-900">
                    {currency(cartSubtotal)}
                  </span>
                </div>

                <Link to="/cart" className={`${primaryButtonClass} mt-4 w-full`}>
                  View Cart
                </Link>
              </>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
};

export default Pharmacy;
