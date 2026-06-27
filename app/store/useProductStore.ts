import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Category {
  id: string;
  name: string;
  slug: string | null;
  products:Product[]
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
  fetchProducts: (
    page?: number,
    limit?: number,
    loadMore?: boolean,
  ) => Promise<void>;
  fetchCategories: () => Promise<void>;
  addProduct: (product: any) => Promise<void>;
  updateStock: (id: string, stock: number) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  clearProducts: () => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: [],
      categories: [],
      metadata: null,
      isLoading: false,

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

      fetchCategories: async () => {
        const res = await fetch("/api/categories");
        const data = await res.json();
        set({ categories: data });
      },

      addProduct: async (newProduct) => {
        const res = await fetch("/api/products", {
          method: "POST",
          body: JSON.stringify(newProduct),
        });
        if (res.ok) {
          get().fetchProducts();
        }
      },

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

      deleteProduct: async (id) => {
        await fetch(`/api/products?id=${id}`, { method: "DELETE" });
        set({ products: get().products.filter((p) => p.id !== id) });
      },

      clearProducts: () =>
        set({ products: [], categories: [], metadata: null }),
    }),
    { name: "product-storage", storage: createJSONStorage(() => localStorage) },
  ),
);
