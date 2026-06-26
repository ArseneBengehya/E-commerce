import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { checkAuth } from "../utils/checkAuth";

interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
}

interface FavoriteState {
  favorites: FavoriteItem[];
  addToFavorites: (product: FavoriteItem) => void;
  removeFromFavorites: (productId: string) => void;
  toggleFavorite: (product: FavoriteItem) => void;
  isFavorite: (productId: string) => boolean;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addToFavorites: async (product) => {
        const isAuthed = await checkAuth();
        if (!isAuthed) return;

        const current = get().favorites;
        if (!current.some((item) => item.id === product.id)) {
          set({ favorites: [...current, product] });
        }
      },

      removeFromFavorites: async (productId) => {
        const isAuthed = await checkAuth();
        if (!isAuthed) return;

        set({
          favorites: get().favorites.filter((item) => item.id !== productId),
        });
      },

      // Alterne l'état (ajoute si absent, supprime si présent)
      toggleFavorite: async (product) => {
        const isAuthed = await checkAuth();
        if (!isAuthed) return;

        const isFav = get().isFavorite(product.id);
        if (isFav) {
          get().removeFromFavorites(product.id);
        } else {
          get().addToFavorites(product);
        }
      },

      isFavorite: (productId) => {
        return get().favorites.some((item) => item.id === productId);
      },
    }),
    {
      name: "favorite-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);