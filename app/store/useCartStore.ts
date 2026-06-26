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

interface CartState {
  cart: CartItem[];

  // Actions
  addToCart: (product: Omit<CartItem, "quantity">, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Checkout
  checkout: () => Promise<{ success: boolean; message: string }>;

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

      // LOGIQUE DE CHECKOUT
      checkout: async () => {
        const isAuthed = await checkAuth();
        if (!isAuthed)
          return {
            success: false,
            message: "Vous devez être connecté pour commander.",
          };

        const { cart, clearCart } = get();
        if (cart.length === 0)
          return { success: false, message: "Votre panier est vide." };

        try {
          // Simulation d'une requête API vers ton backend
          // Ici, tu appelleras une route API type: await fetch('/api/checkout', { method: 'POST', body: JSON.stringify(cart) })
          console.log("Traitement de la commande pour :", cart);

          await new Promise((resolve) => setTimeout(resolve, 2000)); // Latence de 2s simulée

          // Une fois le paiement validé côté serveur :
          clearCart();
          return { success: true, message: "Commande validée avec succès !" };
        } catch (error) {
          return {
            success: false,
            message: "Erreur lors du paiement. Veuillez réessayer.",
          };
        }
      },

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
