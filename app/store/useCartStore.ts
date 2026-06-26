import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Type du produit dans le panier (on reprend ton type Product + la quantité)
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
  addToCart: (product: Omit<CartItem, "quantity">) => void;
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

      // Ajouter un produit ou augmenter sa quantité s'il existe déjà
      addToCart: (product) => {
        const currentCart = get().cart;
        const existingItem = currentCart.find((item) => item.id === product.id);

        if (existingItem) {
          // On vérifie qu'on ne dépasse pas le stock disponible
          if (existingItem.quantity >= product.stock) return;
          
          set({
            cart: currentCart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          // Nouveau produit dans le panier, quantité initiale = 1
          set({ cart: [...currentCart, { ...product, quantity: 1 }] });
        }
      },

      // Supprimer complètement un produit du panier
      removeFromCart: (productId) => {
        set({
          cart: get().cart.filter((item) => item.id !== productId),
        });
      },

      // Modifier manuellement la quantité (+ / - ou input)
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set({
          cart: get().cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },

      // Vider tout le panier (après une commande réussie par exemple)
      clearCart: () => set({ cart: [] }),

      // Calculer le prix total global
      getTotalPrice: () => {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      // Calculer le nombre total d'articles dans le panier
      getCartCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage", // Clé unique pour le panier dans le localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);