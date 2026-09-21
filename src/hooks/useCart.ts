import { useMemo } from "react";
import { medicines, type Medicine } from "../data/medicines";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  addToCart as addToCartAction,
  updateQuantity as updateQuantityAction,
  removeFromCart as removeFromCartAction,
  clearCart as clearCartAction,
  type CartItem,
} from "../store/cartSlice";

interface CartItemDetails extends CartItem {
  medicine: Medicine;
}

export const useCart = () => {
  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const getQuantity = (medicineId: string) =>
    items.find((item) => item.medicineId === medicineId)?.quantity ?? 0;

  const cartDetails = useMemo(
    () =>
      items
        .map((item) => {
          const medicine = medicines.find(
            (entry) => entry.id === item.medicineId,
          );
          return medicine ? { ...item, medicine } : null;
        })
        .filter((item): item is CartItemDetails => item !== null),
    [items],
  );

  const cartCount = cartDetails.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const cartSubtotal = cartDetails.reduce(
    (total, item) => total + item.medicine.price * item.quantity,
    0,
  );

  return {
    cartDetails,
    cartCount,
    cartSubtotal,
    getQuantity,
    addToCart: (medicineId: string) => dispatch(addToCartAction(medicineId)),
    updateQuantity: (medicineId: string, delta: number) =>
      dispatch(updateQuantityAction({ medicineId, delta })),
    removeFromCart: (medicineId: string) =>
      dispatch(removeFromCartAction(medicineId)),
    clearCart: () => dispatch(clearCartAction()),
  };
};
