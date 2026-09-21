import { Link, useLocation } from "react-router-dom";
import {
  Banknote,
  CheckCircle2,
  CreditCard,
  MapPin,
  Pill,
  ShoppingBag,
} from "lucide-react";
import { currency } from "../utils/currency";
import type { OrderSummary } from "../types/order";

const eyebrowClass =
  "inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-700";

const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

const OrderSuccess = () => {
  const location = useLocation();
  const order = location.state as OrderSummary | null;

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <ShoppingBag size={28} />
        </div>

        <h1 className="mt-6 text-xl font-bold text-slate-900">
          No order found
        </h1>

        <p className="mt-2 text-slate-600">
          We couldn't find any recent order details to show here.
        </p>

        <Link to="/pharmacy" className={`${primaryButtonClass} mt-8 inline-flex`}>
          Browse Pharmacy
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircle2 size={32} />
          </div>

          <span className={`mt-6 inline-flex ${eyebrowClass}`}>
            Order Confirmed
          </span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Thank You, {order.customerName.split(" ")[0]}!
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Your order{" "}
            <span className="font-semibold text-slate-900">
              #{order.orderNumber}
            </span>{" "}
            has been placed successfully. We'll deliver it as soon as
            possible.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <MapPin size={16} className="text-blue-600" />
              Delivery Address
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {order.customerName}
              <br />
              {order.address}
              <br />
              {order.city}, {order.postalCode}
              <br />
              {order.phone}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
              {order.paymentMethod === "card" ? (
                <CreditCard size={16} className="text-blue-600" />
              ) : (
                <Banknote size={16} className="text-blue-600" />
              )}
              Payment Method
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {order.paymentMethod === "card"
                ? "Credit / Debit Card"
                : "Cash on Delivery"}
              <br />
              Confirmation sent to {order.email}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="text-sm font-bold text-slate-900">Order Summary</h3>

          <ul className="mt-4 divide-y divide-slate-100">
            {order.items.map((item) => (
              <li key={item.id} className="flex items-center gap-3 py-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                  <Pill size={20} className="text-blue-600" />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-500">Qty {item.quantity}</p>
                </div>

                <p className="text-sm font-semibold text-slate-900">
                  {currency(item.price * item.quantity)}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-4 space-y-3 border-t border-slate-200 pt-4 text-sm">
            <div className="flex items-center justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-medium text-slate-900">
                {currency(order.subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Delivery</span>
              <span className="font-medium text-slate-900">
                {order.deliveryFee === 0 ? "Free" : currency(order.deliveryFee)}
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
            <span className="text-sm font-medium text-slate-600">Total</span>
            <span className="text-lg font-bold text-slate-900">
              {currency(order.total)}
            </span>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link to="/pharmacy" className={primaryButtonClass}>
            Continue Shopping
          </Link>
        </div>
      </section>
    </div>
  );
};

export default OrderSuccess;
