import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Ajout du type Category aligné sur ton schéma
interface Category {
  id: string;
  name: string;
  slug: string | null;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  categoryId: string;
  category: Category;
}

interface Metadata {
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface ProductState {
  products: Product[];
  categories: Category[]; // Stockage global des catégories
  metadata: Metadata | null;
  isLoading: boolean;
  isCategoriesLoading: boolean; // Loading dédié aux catégories
  error: string | null;

  fetchProducts: (
    page?: number,
    limit?: number,
    loadMore?: boolean,
  ) => Promise<void>;
  fetchCategories: () => Promise<void>; // Nouvelle action
  clearProducts: () => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: [],
      categories: [],
      metadata: null,
      isLoading: false,
      isCategoriesLoading: false,
      error: null,

      fetchProducts: async (page = 1, limit = 50, loadMore = false) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(
            `/api/products?page=${page}&limit=${limit}`,
          );
          if (!response.ok) throw new Error("Erreur produits");
          const result = await response.json();
          set({
            products: loadMore
              ? [...get().products, ...result.data]
              : result.data,
            metadata: result.metadata,
            isLoading: false,
          });
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
        }
      },

      // Récupération des catégories
      fetchCategories: async () => {
        set({ isCategoriesLoading: true, error: null });
        try {
          const response = await fetch("/api/categories");
          if (!response.ok) throw new Error("Erreur catégories");

          const data = await response.json(); // C'est directement le tableau !

          set({
            categories: data, // Ne pas écrire data.data !
            isCategoriesLoading: false,
          });
        } catch (err: any) {
          set({ error: err.message, isCategoriesLoading: false });
        }
      },

      clearProducts: () =>
        set({ products: [], categories: [], metadata: null }),
    }),
    {
      name: "product-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        products: state.products,
        categories: state.categories,
        metadata: state.metadata,
      }),
    },
  ),
);
