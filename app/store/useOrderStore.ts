import { create } from "zustand";

interface Order {
  id: string;
  totalAmount: number;
  status: string;
  city: string;
  commune: string;
  address: string;
  createdAt: Date;
  items: any[]; // Tu pourras typé plus finement plus tard
}

interface OrderState {
  myOrders: Order[];
  isLoading: boolean;
  fetchOrders: () => Promise<void>;
}

export const useOrderStore = create<OrderState>((set) => ({
  myOrders: [],
  isLoading: false,

  fetchOrders: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch("/api/orders/my-orders");
      const data = await response.json();
      if (data.success) {
        set({ myOrders: data.orders });
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));