"use client";

import { Card } from "@/app/components/Card";
import { useCartStore } from "@/app/store/useCartStore";
import { useProductStore } from "@/app/store/useProductStore";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useMemo } from "react";

export default function Page() {
  const {
    products,
    metadata,
    isLoading,
    fetchProducts,
    categories,
    fetchCategories,
    isCategoriesLoading,
  } = useProductStore();

  const { cart } = useCartStore();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    id ?? null,
  );

  useEffect(() => {
    fetchProducts(1, 50, false);
  }, []);

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [fetchCategories, categories.length]);

  const handleLoadMore = () => {
    if (metadata && metadata.hasNextPage && !isLoading) {
      const nextPage = metadata.currentPage + 1;
      fetchProducts(nextPage, 50, true);
    }
  };

  // No effect needed to sync id -> selectedCategoryId because we initialize state from the param

  // LOGIQUE DE FILTRAGE CÔTÉ CLIENT
  const filteredProducts = useMemo(() => {
    if (!selectedCategoryId) return products;
    return products.filter(
      (product) => product.categoryId === selectedCategoryId,
    );
  }, [products, selectedCategoryId]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6">
      {/* SECTEUR DES CATÉGORIES EN HAUT */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <p className="font-bold text-md text-primary">Nos </p>{" "}
          <p className="text-md font-bold">Catégories</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Bouton pour tout réinitialiser */}
          <button
            onClick={() => setSelectedCategoryId(null)}
            className={`py-1 px-2 text-center text-[11px] font-bold tracking-wide rounded-lg transition-all duration-200 ease-out cursor-pointer select-none border ${
              selectedCategoryId === null
                ? "bg-primary text-white border-primary"
                : "bg-white text-black border-gray-100 hover:-translate-y-0.5"
            }`}
          >
            Tout voir
          </button>

          {isCategoriesLoading && categories.length === 0
            ? /* Squelettes si en cours de chargement */
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="py-2 w-24 bg-gray-100 rounded-lg animate-pulse h-[33px]"
                />
              ))
            : /* Affichage dynamique des boutons de catégories */
              categories.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedCategoryId(item.id)}
                  className={`py-2 px-4 text-center text-[11px] font-bold tracking-wide rounded-lg transition-all duration-200 ease-out cursor-pointer select-none border ${
                    selectedCategoryId === item.id
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-black border-gray-100 hover:-translate-y-0.5"
                  }`}
                >
                  {item.name}
                </button>
              ))}
        </div>
      </div>

      {/* COMPTEUR DE PRODUITS ET GRILLE */}
      <div className="space-y-3">
        <p className="text-[11px] font-medium text-muted tracking-wide uppercase px-1">
          Nous avons trouvé{" "}
          <span className="text-primary font-black">
            {filteredProducts.length}
          </span>{" "}
          produits {selectedCategoryId && "dans cette catégorie"}
        </p>

        {/* GRILLE DE PRODUITS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {isLoading && products.length === 0
            ? /* Squelettes Produits */
              Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden border border-gray-50 h-[290px] animate-pulse p-3 space-y-3"
                >
                  <div className="bg-gray-200 h-40 w-full rounded-lg" />
                  <div className="h-4 bg-gray-200 rounded-sm w-3/4" />
                  <div className="flex justify-between items-center">
                    <div className="h-5 bg-gray-200 rounded-sm w-1/4" />
                    <div className="h-4 bg-gray-200 rounded-sm w-1/3" />
                  </div>
                  <div className="h-8 bg-gray-200 rounded-lg w-full" />
                </div>
              ))
            : filteredProducts.map((product) => (
                <Card key={product.id} product={product} />
              ))}
        </div>
      </div>

      {/* SECTION CHARGEMENT ET PAGINATION EN BAS (Masquée si on a appliqué un filtre spécifique) */}
      {!selectedCategoryId && (
        <div className="w-full flex flex-col items-center justify-center pt-4 clear-both">
          {isLoading && products.length > 0 && (
            <p className="text-xs text-gray-500 text-center animate-pulse">
              Chargement des éléments suivants...
            </p>
          )}

          {metadata?.hasNextPage && !isLoading && (
            <button
              onClick={handleLoadMore}
              className="h-8 rounded-md bg-slate-900 text-white font-bold text-xs px-4 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Afficher les produits suivants
            </button>
          )}
        </div>
      )}
    </div>
  );
}
