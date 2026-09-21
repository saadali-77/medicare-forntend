import { Link, useParams } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  Minus,
  PackageX,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { medicines } from "../data/medicines";
import { useCart } from "../hooks/useCart";
import { currency } from "../utils/currency";

const eyebrowClass =
  "inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-700";

const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

const secondaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

const MedicineDetails = () => {
  const { id } = useParams<{ id: string }>();
  const medicine = medicines.find((entry) => entry.id === id);
  const { getQuantity, addToCart, updateQuantity } = useCart();

  if (!medicine) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-lg font-semibold text-slate-900">
          Medicine not found
        </p>
        <p className="mt-2 text-sm text-slate-500">
          The product you're looking for doesn't exist or may have been
          removed.
        </p>
        <Link
          to="/pharmacy"
          className={`${primaryButtonClass} mt-6 inline-flex`}
        >
          <ArrowLeft size={16} />
          Back to Pharmacy
        </Link>
      </div>
    );
  }

  const quantity = getQuantity(medicine.id);

  const relatedMedicines = medicines
    .filter(
      (entry) =>
        entry.category === medicine.category && entry.id !== medicine.id,
    )
    .slice(0, 3);

  return (
    <div>
      {/* Header */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <Link
            to="/pharmacy"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            <ArrowLeft size={16} />
            Back to Pharmacy
          </Link>

          <div className="mt-8 grid gap-10 md:grid-cols-[320px_1fr] md:items-start">
            <div className="relative h-72 overflow-hidden rounded-3xl bg-blue-100 md:h-80">
              <img
                src={medicine.image}
                alt={medicine.name}
                className="h-full w-full object-cover"
              />

              {medicine.prescriptionRequired && (
                <span className="absolute top-4 left-4 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
                  <AlertCircle size={12} />
                  Rx Required
                </span>
              )}

              {!medicine.inStock && (
                <span className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700">
                  <PackageX size={12} />
                  Out of Stock
                </span>
              )}
            </div>

            <div>
              <span className={eyebrowClass}>{medicine.category}</span>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {medicine.name}
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                {medicine.manufacturer} · {medicine.unit}
              </p>

              <p className="mt-5 max-w-2xl leading-7 text-slate-600">
                {medicine.description}
              </p>

              <p className="mt-6 text-3xl font-bold text-slate-900">
                {currency(medicine.price)}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                {!medicine.inStock ? (
                  <button type="button" disabled className={primaryButtonClass}>
                    Unavailable
                  </button>
                ) : quantity > 0 ? (
                  <div className="flex items-center gap-4 rounded-lg border border-slate-300 px-3 py-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(medicine.id, -1)}
                      className="flex h-8 w-8 items-center justify-center rounded text-slate-600 transition hover:bg-slate-100"
                      aria-label={`Decrease ${medicine.name} quantity`}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-6 text-center text-base font-semibold text-slate-900">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(medicine.id, 1)}
                      className="flex h-8 w-8 items-center justify-center rounded text-slate-600 transition hover:bg-slate-100"
                      aria-label={`Increase ${medicine.name} quantity`}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => addToCart(medicine.id)}
                    className={primaryButtonClass}
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                )}

                <Link to="/pharmacy" className={secondaryButtonClass}>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related medicines */}
      {relatedMedicines.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            More in {medicine.category}
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedMedicines.map((related) => (
              <Link
                key={related.id}
                to={`/pharmacy/${related.id}`}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-48 overflow-hidden bg-blue-100">
                  <img
                    src={related.image}
                    alt={related.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900">
                    {related.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-blue-600">
                    {currency(related.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MedicineDetails;
