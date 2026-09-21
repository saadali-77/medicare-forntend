import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Banknote,
  CreditCard,
  MapPin,
  Pill,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "../hooks/useCart";
import { currency } from "../utils/currency";
import type { OrderSummary } from "../types/order";

const checkoutSchema = z
  .object({
    fullName: z.string().min(2, "Please enter your full name"),
    email: z.string().email("Enter a valid email address"),
    phone: z.string().min(7, "Enter a valid phone number"),
    address: z.string().min(5, "Enter your delivery address"),
    city: z.string().min(2, "Enter your city"),
    postalCode: z.string().min(3, "Enter a valid postal code"),
    paymentMethod: z.enum(["cod", "card"]),
    cardNumber: z.string().optional(),
    cardExpiry: z.string().optional(),
    cardCvv: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod !== "card") return;

    if (!data.cardNumber || data.cardNumber.replace(/\s/g, "").length < 16) {
      ctx.addIssue({
        code: "custom",
        message: "Enter a valid 16-digit card number",
        path: ["cardNumber"],
      });
    }

    if (!data.cardExpiry) {
      ctx.addIssue({
        code: "custom",
        message: "Enter the card expiry date",
        path: ["cardExpiry"],
      });
    }

    if (!data.cardCvv || data.cardCvv.length < 3) {
      ctx.addIssue({
        code: "custom",
        message: "Enter a valid CVV",
        path: ["cardCvv"],
      });
    }
  });

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const eyebrowClass =
  "inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-700";

const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

const inputClass =
  "w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20";

const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

const errorClass = "mt-1 text-xs text-red-600";

const FREE_DELIVERY_THRESHOLD = 10000;
const DELIVERY_FEE = 150;

const Checkout = () => {
  const { cartDetails, cartCount, cartSubtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: "cod" },
  });

  const paymentMethod = watch("paymentMethod");

  const deliveryFee =
    cartSubtotal > 0 && cartSubtotal < FREE_DELIVERY_THRESHOLD
      ? DELIVERY_FEE
      : 0;
  const orderTotal = cartSubtotal + deliveryFee;

  const onSubmit = async (values: CheckoutFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const orderSummary: OrderSummary = {
      orderNumber: `MH-${Math.floor(100000 + Math.random() * 900000)}`,
      items: cartDetails.map(({ medicine, quantity }) => ({
        id: medicine.id,
        name: medicine.name,
        quantity,
        price: medicine.price,
      })),
      subtotal: cartSubtotal,
      deliveryFee,
      total: orderTotal,
      customerName: values.fullName,
      email: values.email,
      phone: values.phone,
      address: values.address,
      city: values.city,
      postalCode: values.postalCode,
      paymentMethod: values.paymentMethod,
    };

    console.log("Order placed:", orderSummary);
    clearCart();
    navigate("/order-success", { state: orderSummary, replace: true });
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <span className={eyebrowClass}>Checkout</span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Complete Your Order
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Enter your delivery details and choose how you'd like to pay.
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
            Add medicines to your cart before checking out.
          </p>

          <Link to="/pharmacy" className={`${primaryButtonClass} mt-8 inline-flex`}>
            Browse Pharmacy
          </Link>
        </section>
      ) : (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-8"
              noValidate
            >
              {/* Delivery details */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                  <MapPin size={18} className="text-blue-600" />
                  Delivery Details
                </h2>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="fullName">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      className={inputClass}
                      {...register("fullName")}
                    />
                    {errors.fullName && (
                      <p className={errorClass}>{errors.fullName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="email">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className={inputClass}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className={errorClass}>{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label className={labelClass} htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+92 300 1234567"
                    className={inputClass}
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className={errorClass}>{errors.phone.message}</p>
                  )}
                </div>

                <div className="mt-6">
                  <label className={labelClass} htmlFor="address">
                    Delivery Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    placeholder="House no., street, area"
                    className={inputClass}
                    {...register("address")}
                  />
                  {errors.address && (
                    <p className={errorClass}>{errors.address.message}</p>
                  )}
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="city">
                      City
                    </label>
                    <input
                      id="city"
                      type="text"
                      placeholder="Lahore"
                      className={inputClass}
                      {...register("city")}
                    />
                    {errors.city && (
                      <p className={errorClass}>{errors.city.message}</p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="postalCode">
                      Postal Code
                    </label>
                    <input
                      id="postalCode"
                      type="text"
                      placeholder="54000"
                      className={inputClass}
                      {...register("postalCode")}
                    />
                    {errors.postalCode && (
                      <p className={errorClass}>
                        {errors.postalCode.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                  <CreditCard size={18} className="text-blue-600" />
                  Payment Method
                </h2>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition ${
                      paymentMethod === "cod"
                        ? "border-blue-600 bg-blue-50"
                        : "border-slate-300 hover:border-slate-400"
                    }`}
                  >
                    <input
                      type="radio"
                      value="cod"
                      className="sr-only"
                      {...register("paymentMethod")}
                    />
                    <Banknote size={20} className="text-blue-600" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Cash on Delivery
                      </p>
                      <p className="text-xs text-slate-500">
                        Pay when your order arrives
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition ${
                      paymentMethod === "card"
                        ? "border-blue-600 bg-blue-50"
                        : "border-slate-300 hover:border-slate-400"
                    }`}
                  >
                    <input
                      type="radio"
                      value="card"
                      className="sr-only"
                      {...register("paymentMethod")}
                    />
                    <CreditCard size={20} className="text-blue-600" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Credit / Debit Card
                      </p>
                      <p className="text-xs text-slate-500">
                        Pay securely online
                      </p>
                    </div>
                  </label>
                </div>

                {paymentMethod === "card" && (
                  <div className="mt-6 space-y-6">
                    <div>
                      <label className={labelClass} htmlFor="cardNumber">
                        Card Number
                      </label>
                      <input
                        id="cardNumber"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className={inputClass}
                        {...register("cardNumber")}
                      />
                      {errors.cardNumber && (
                        <p className={errorClass}>
                          {errors.cardNumber.message}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label className={labelClass} htmlFor="cardExpiry">
                          Expiry Date
                        </label>
                        <input
                          id="cardExpiry"
                          type="text"
                          placeholder="MM/YY"
                          className={inputClass}
                          {...register("cardExpiry")}
                        />
                        {errors.cardExpiry && (
                          <p className={errorClass}>
                            {errors.cardExpiry.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className={labelClass} htmlFor="cardCvv">
                          CVV
                        </label>
                        <input
                          id="cardCvv"
                          type="text"
                          placeholder="123"
                          className={inputClass}
                          {...register("cardCvv")}
                        />
                        {errors.cardCvv && (
                          <p className={errorClass}>
                            {errors.cardCvv.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`${primaryButtonClass} w-full sm:w-auto`}
              >
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </button>
            </form>

            {/* Order summary */}
            <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 lg:sticky lg:top-24">
              <h3 className="text-lg font-bold text-slate-900">
                Order Summary
              </h3>

              <ul className="mt-6 space-y-4">
                {cartDetails.map(({ medicine, quantity }) => (
                  <li key={medicine.id} className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                      <Pill size={20} className="text-blue-600" />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900">
                        {medicine.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        Qty {quantity}
                      </p>
                    </div>

                    <p className="text-sm font-semibold text-slate-900">
                      {currency(medicine.price * quantity)}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-3 border-t border-slate-200 pt-4 text-sm">
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
                    {deliveryFee === 0 ? "Free" : currency(deliveryFee)}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
                <span className="text-sm font-medium text-slate-600">
                  Total
                </span>
                <span className="text-lg font-bold text-slate-900">
                  {currency(orderTotal)}
                </span>
              </div>
            </aside>
          </div>
        </section>
      )}
    </div>
  );
};

export default Checkout;
