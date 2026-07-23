import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { errorNotification, sucessNotification } from "../utils";
import { Order } from "./useOrderStore";

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
  isDelete: boolean;
  category: Category;
  orderItems: Order[];
}
interface Metadata {
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ProductState {
  products: Product[];
  allProducts: Product[];
  categories: Category[];
  allCategories: Category[];
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
  fetchAllCategories: () => Promise<void>;
  fetchAllProducts:()=> Promise<void>;
  addProduct: (product: any) => Promise<void>;
  addCategory: (category: any) => Promise<void>;
  updateStock: (id: string, stock: number) => Promise<void>;
  updateCategory: (id: string, name: string, slug: string) => Promise<void>;
  updateProduct: (form: any) => Promise<void>;
  deleteProduct: (id: string, onComplete?: () => void) => Promise<void>;
  deleteCategory: (id: string, onComplete?: () => void) => Promise<void>;
  clearProducts: () => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: [],
      categories: [],
      allCategories: [],
      metadata: null,
      isLoading: false,
      allProducts: [],
      //recuperation de produits
      fetchProducts: async (page = 1, limit = 50, loadMore = false) => {
        try {
          set({ isLoading: true });
          const res = await fetch(`/api/products?page=${page}&limit=${limit}`);
          const result = await res.json();
          set({
            products: loadMore
              ? [...get().products, ...result.data.filter((item: Product) => !item.isDelete)]
              : result.data,
            metadata: result.metadata,
            isLoading: false,
          });
        } catch (error) {
          console.warn(
            "Impossible de récupérer les produits en ligne, utilisation du cache local.",
          );
        } finally {
          set({ isLoading: false });
        }
      },

      fetchAllProducts: async (page = 1, limit = 50, loadMore = false) => {
        try {
          set({ isLoading: true });
          const res = await fetch(`/api/products?page=${page}&limit=${limit}`);
          const result = await res.json();
          set({
            allProducts: loadMore
              ? [...get().allProducts, ...result.data]
              : result.data,
            metadata: result.metadata,
            isLoading: false,
          });
        } catch (error) {
          console.warn(
            "Impossible de récupérer les produits en ligne, utilisation du cache local.",
          );
        } finally {
          set({ isLoading: false });
        }
      },

      //recuperation de categorie
      fetchCategories: async () => {
        set({ isCategoriesLoading: true });
        try {
          const res = await fetch("/api/categories");
          if (!res.ok) throw new Error("Erreur réseau");
          const data = await res.json();
          set({ categories: data.filter((item: Category) => !item.isDelete) });
        } catch (error) {
          console.warn(
            "Impossible de récupérer les catégories en ligne, utilisation du cache local.",
          );
        } finally {
          set({ isCategoriesLoading: false });
        }
      },

      fetchAllCategories: async () => {
        set({ isActionLoading: true });
        try {
          const res = await fetch("/api/categories");
          if (!res.ok) throw new Error("Erreur réseau");
          const data = await res.json();
          set({ allCategories: data });
        } catch (error) {
          console.warn(
            "Impossible de récupérer les catégories en ligne, utilisation du cache local.",
          );
        } finally {
          set({ isActionLoading: false });
        }
      },

      //ajout d'un nouveau produit
      addProduct: async (product) => {
        try {
          set({ isActionLoading: true });
          const res = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
          });

          if (!res.ok) throw new Error("Erreur lors de l'ajout");

          const data = await res.json();
          set((state) => {
            return {
              products: [...state.products, data.product],
            };
          });
          sucessNotification(data.message);
        } catch (error) {
          console.error("Échec de l'ajout :", error);
          errorNotification(error as string);
        } finally {
          set({ isActionLoading: false });
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

          const data = await res.json();

          if (!res.ok) throw new Error(data.message || "Erreur lors l'ajout");
          set((state) => {
            return {
              categories: [...state.categories, data.category],
            };
          });
          sucessNotification(data.message);
        } catch (error: any) {
          console.error("Échec de l'ajout de la categorie :", error);
          console.log(error);
          errorNotification(error.message as string);
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

      //modifier un produit
      updateProduct: async (form) => {
        try {
          set({ isActionLoading: true });
          const response = await fetch("/api/products/item", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });

          if (!response.ok) throw new Error("Erreur lors de la mise à jour");

          const data = await response.json();
          set((state) => ({
            products: state.products.map((c) =>
              c.id === form.id ? { ...c, ...data.data } : c,
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
            products: data.products
              ? state.products.map((p) =>
                  p.categoryId === id ? { ...p, isDelete: false } : p,
                )
              : state.products,
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
      deleteProduct: async (id, onComplete) => {
        try {
          set({ isActionLoading: true });
          const response = await fetch("/api/products/delete", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
          });

          if (!response.ok) throw new Error("Erreur lors de la suppression");

          const data = await response.json();
          set((state) => ({
            products: state.products.map((p) =>
              p.id === id ? { ...p, ...data.updatedProduct } : p,
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

      //vider le storage de categories et produits
      clearProducts: () =>
        set({ products: [], categories: [], metadata: null }),
    }),

    { name: "product-storage", storage: createJSONStorage(() => localStorage) },
  ),
);
