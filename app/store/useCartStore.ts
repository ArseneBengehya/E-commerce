import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { checkAuth } from "../utils/checkAuth";
interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
}

interface DestinationItem {
  city: string;
  commune: string;
  adress: string;
}

interface CartState {
  cart: CartItem[];

  // Actions
  addToCart: (product: Omit<CartItem, "quantity">, quantity: number) => void;
  validPaiement: (form: DestinationItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Utilitaires calculés
  getTotalPrice: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: async (product, quantity) => {
        const isAuthed = await checkAuth();
        if (!isAuthed) return;

        const currentCart = get().cart;
        const existingItem = currentCart.find((item) => item.id === product.id);

        if (existingItem) {
          const newQuantity = existingItem.quantity + quantity;
          if (newQuantity > product.stock) return;

          set({
            cart: currentCart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: newQuantity }
                : item,
            ),
          });
        } else {
          set({ cart: [...currentCart, { ...product, quantity }] });
        }
      },

      validPaiement: async (form) => {
        const isAuthed = await checkAuth();
        if (!isAuthed) return { success: false, message: "Non authentifié" };

        const currentCart = get().cart;
        if (currentCart.length === 0)
          return { success: false, message: "Panier vide" };

        const totalAmount = currentCart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );
        const order = {
          totalAmount: totalAmount,
          status: "PAID",
          city: form.city,
          commune: form.commune,
          address: form.adress,
        };

        const orderItems = currentCart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        }));

        try {
          const response = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              order,
              orderItems,
            }),
          });

          const result = await response.json();

          if (result.success) {
            get().clearCart();
            return { success: true };
          }
          return { success: false, message: result.message };
        } catch (error) {
          return {
            success: false,
            message: "Erreur serveur lors de la commande",
          };
        }
      },

      removeFromCart: async (productId) => {
        const isAuthed = await checkAuth();
        if (!isAuthed) return;
        set({
          cart: get().cart.filter((item) => item.id !== productId),
        });
      },

      updateQuantity: async (productId, quantity) => {
        const isAuthed = await checkAuth();
        if (!isAuthed) return;

        const product = get().cart.find((item) => item.id === productId);
        if (!product) return;
        if (quantity > product.stock) return;

        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set({
          cart: get().cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item,
          ),
        });
      },

      clearCart: () => set({ cart: [] }),

      getTotalPrice: () => {
        return get().cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },

      getCartCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
