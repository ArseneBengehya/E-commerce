import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { errorNotification, sucessNotification } from "../utils";

interface Category {
  id: string;
  name: string;
  slug: string | null;
  isDelete: boolean;
  products: Product[];
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
  categories: Category[];
  metadata: Metadata | null;
  isLoading: boolean;
  isCategoriesLoading?: boolean;
  isActionLoading?: boolean;

  fetchProducts: (
    page?: number,
    limit?: number,
    loadMore?: boolean,
  ) => Promise<void>;
  fetchCategories: () => Promise<void>;
  addProduct: (product: any) => Promise<void>;
  addCategory: (category: any) => Promise<void>;
  updateStock: (id: string, stock: number) => Promise<void>;
  updateCategory: (id: string, name: string, slug: string) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  deleteCategory: (id: string, onComplete?: () => void) => Promise<void>;
  clearProducts: () => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: [],
      categories: [],
      metadata: null,
      isLoading: false,

      //recuperation de produits
      fetchProducts: async (page = 1, limit = 50, loadMore = false) => {
        set({ isLoading: true });
        const res = await fetch(`/api/products?page=${page}&limit=${limit}`);
        const result = await res.json();
        set({
          products: loadMore
            ? [...get().products, ...result.data]
            : result.data,
          metadata: result.metadata,
          isLoading: false,
        });
      },

      //recuperation de categorie
      fetchCategories: async () => {
        set({ isCategoriesLoading: true });
        const res = await fetch("/api/categories");
        const data = await res.json();
        set({ categories: data });
        set({ isCategoriesLoading: false });
      },

      //ajout d'un nouveau produit
      addProduct: async (newProduct) => {
        const res = await fetch("/api/products", {
          method: "POST",
          body: JSON.stringify(newProduct),
        });
        if (res.ok) {
          get().fetchProducts();
        }
      },

      // ajout d'une nouvelle categorie
      addCategory: async (category) => {
        try {
          set({ isActionLoading: true });
          const res = await fetch("/api/categories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(category),
          });

          if (!res.ok) throw new Error("Erreur lors de la mise à jour");

          const data = await res.json();
          set((state) => {
            return {
              categories: [...state.categories, data.category],
            };
          });
          sucessNotification(data.message);
        } catch (error) {
          console.error("Échec de la mise à jour :", error);
          errorNotification(error as string);
        } finally {
          set({ isActionLoading: false });
        }
      },

      //mise a jour de stock
      updateStock: async (id, stock) => {
        await fetch("/api/products", {
          method: "PATCH",
          body: JSON.stringify({ id, stock }),
        });
        set({
          products: get().products.map((p) =>
            p.id === id ? { ...p, stock } : p,
          ),
        });
      },

      // mise a jour de categorie
      updateCategory: async (id, name, slug) => {
        try {
          set({ isActionLoading: true });
          const response = await fetch("/api/categories", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, name, slug }),
          });

          if (!response.ok) throw new Error("Erreur lors de la mise à jour");

          const data = await response.json();
          set((state) => ({
            categories: state.categories.map((c) =>
              c.id === id ? { ...c, ...data.data } : c,
            ),
          }));
          sucessNotification(data.message);
        } catch (error) {
          console.error("Échec de la mise à jour :", error);
          errorNotification(error as string);
        } finally {
          set({ isActionLoading: false });
        }
      },

      //suppression(mise a jour de isdelete)
      deleteCategory: async (id, onComplete) => {
        try {
          set({ isActionLoading: true });
          const response = await fetch("/api/categories/delete", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
          });

          if (!response.ok) throw new Error("Erreur lors de la suppression");

          const data = await response.json();
          set((state) => ({
            categories: state.categories.map((c) =>
              c.id === id ? { ...c, ...data.categories } : c,
            ),
          }));
          set((state) => ({
            categories: state.categories.map((c) =>
              c.id === id ? { ...c, ...data.categories } : c,
            ),
            products: state.products.map((p) =>
              p.categoryId === id ? { ...p, isDelete: false } : p,
            ),
          }));
          sucessNotification(data.message);
        } catch (error) {
          console.error("Échec de la suppression :", error);
          errorNotification(error as string);
        } finally {
          set({ isActionLoading: false });
          if (onComplete) onComplete();
        }
      },

      //suppression de produits
      deleteProduct: async (id) => {
        await fetch(`/api/products?id=${id}`, { method: "DELETE" });
        set({ products: get().products.filter((p) => p.id !== id) });
      },

      //vider le storage de categories et produits
      clearProducts: () =>
        set({ products: [], categories: [], metadata: null }),
    }),
    { name: "product-storage", storage: createJSONStorage(() => localStorage) },
  ),
);
