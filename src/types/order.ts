export interface OrderItem {
  id: string;
  name: string;
  image?: string;
  quantity: number;
  price: number;
}

export interface OrderSummary {
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: "cod" | "card";
}
