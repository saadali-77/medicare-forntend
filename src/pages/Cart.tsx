import { Link } from "react-router-dom";
import { Minus, Pill, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { currency } from "../utils/currency";

const eyebrowClass =
  "inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-700";

const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

const secondaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

const Cart = () => {
  const { cartDetails, cartCount, cartSubtotal, updateQuantity, removeFromCart } =
    useCart();

  return (
    <div>
      {/* Header */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <span className={eyebrowClass}>Your Cart</span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Shopping Cart
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            {cartCount > 0
              ? `You have ${cartCount} ${cartCount === 1 ? "item" : "items"} in your cart.`
              : "Review your items before checking out."}
          </p>
        </div>
      </section>

      {cartDetails.length === 0 ? (
        <section className="mx-auto max-w-3xl px-6 py-24 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <ShoppingCart size={28} />
          </div>

          <h2 className="mt-6 text-xl font-bold text-slate-900">
            Your cart is empty
          </h2>

          <p className="mt-2 text-slate-600">
            Browse our pharmacy and add medicines to get started.
          </p>

          <Link to="/pharmacy" className={`${primaryButtonClass} mt-8 inline-flex`}>
            Browse Pharmacy
          </Link>
        </section>
      ) : (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            {/* Cart items */}
            <div className="space-y-4">
              {cartDetails.map(({ medicine, quantity }) => (
                <div
                  key={medicine.id}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center"
                >
                  <Link
                    to={`/pharmacy/${medicine.id}`}
                    className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-blue-100"
                  >
                    <Pill className="h-10 w-10 text-blue-600" />
                  </Link>

                  <div className="flex-1">
                    <Link
                      to={`/pharmacy/${medicine.id}`}
                      className="font-bold text-slate-900 transition hover:text-blue-600"
                    >
                      {medicine.name}
                    </Link>
                    <p className="mt-1 text-sm text-slate-500">
                      {medicine.manufacturer} · {medicine.unit}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {currency(medicine.price)}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 sm:flex-col sm:items-end">
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

                    <div className="flex items-center gap-3">
                      <p className="font-bold text-slate-900">
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
                  </div>
                </div>
              ))}

              <Link
                to="/pharmacy"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Order summary */}
            <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 lg:sticky lg:top-24">
              <h3 className="text-lg font-bold text-slate-900">
                Order Summary
              </h3>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center justify-between text-slate-600">
                  <span>
                    Subtotal ({cartCount} {cartCount === 1 ? "item" : "items"})
                  </span>
                  <span className="font-medium text-slate-900">
                    {currency(cartSubtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Delivery</span>
                  <span className="font-medium text-slate-900">
                    Calculated at checkout
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
                <span className="text-sm font-medium text-slate-600">
                  Total
                </span>
                <span className="text-lg font-bold text-slate-900">
                  {currency(cartSubtotal)}
                </span>
              </div>

              <Link to="/checkout" className={`${primaryButtonClass} mt-6 w-full`}>
                Proceed to Checkout
              </Link>

              <Link
                to="/pharmacy"
                className={`${secondaryButtonClass} mt-3 w-full`}
              >
                Continue Shopping
              </Link>
            </aside>
          </div>
        </section>
      )}
    </div>
  );
};

export default Cart;
