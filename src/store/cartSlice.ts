import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  medicineId: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      const medicineId = action.payload;
      const existing = state.items.find(
        (item) => item.medicineId === medicineId,
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ medicineId, quantity: 1 });
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ medicineId: string; delta: number }>,
    ) => {
      const { medicineId, delta } = action.payload;
      const existing = state.items.find(
        (item) => item.medicineId === medicineId,
      );

      if (!existing) return;

      existing.quantity += delta;

      if (existing.quantity <= 0) {
        state.items = state.items.filter(
          (item) => item.medicineId !== medicineId,
        );
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.medicineId !== action.payload,
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
