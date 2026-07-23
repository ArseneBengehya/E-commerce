"use client";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { useProductStore } from "../store/useProductStore";
import { Card } from "../components/Card";

export default function Home() {
  const {
    products,
    isLoading,
    fetchProducts,
    categories,
    fetchCategories,
    fetchAllCategories,
    isCategoriesLoading,
  } = useProductStore();

  useEffect(() => {
    fetchProducts(1, 100, false);
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchAllCategories();
  }, [categories.length, categories]);

  const tabs = ["Vedette", "Récents", "Anciens"];
  const [tabActive, setTabActive] = useState("Vedette");
  const router = useRouter();

  const getStableSeed = (value: string) => {
    let hash = 0;
    for (let i = 0; i < value.length; i += 1) {
      hash = (hash << 5) - hash + value.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  };

  const displayedProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    if (tabActive === "Récents") {
      return products.slice(0, 12);
    }

    if (tabActive === "Anciens") {
      return [...products].reverse().slice(0, 12);
    }
    return [...products]
      .map((product, index) => ({
        product,
        seed: getStableSeed(`${product.id}-${product.name}-${index}`),
      }))
      .sort((a, b) => a.seed - b.seed)
      .slice(0, 12)
      .map(({ product }) => product);
  }, [products, tabActive]);

  return (
    <div className="w-full px-6 lg:px-20 mt-2">
      <div className="relative overflow-x-auto">
        <div className="grid lg:grid-cols-2 items-center gap-8 p-8 lg:p-12">
          {/* TEXTE TRADUIT EN FRANÇAIS */}
          <div className="space-y-4">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary">
              🚀 Performances de Pointe
            </span>

            <div>
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-foreground">
                Technologie & Puissance
              </h1>
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-primary">
                Collection Ordinateurs
              </h1>
            </div>

            <p className="max-w-md text-muted text-xs">
              Boostez votre productivité avec nos derniers ordinateurs haute
              performance. Design épuré, processeurs ultra-rapides et fiabilité
              garantie pour tous vos projets.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <Button
                size="md"
                className="!bg-primary px-6"
                onClick={() => router.push("/shop")}
              >
                Voir les produits
              </Button>
              <span className="text-sm font-medium text-muted">
                Meilleur rapport qualité-prix
              </span>
            </div>
          </div>

          {/* IMAGE BANNIÈRE */}
          <div className="relative flex justify-center">
            <div className="absolute h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            <img
              src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=1000&auto=format&fit=crop"
              alt="Ordinateur portable haute performance"
              className="relative z-10 h-[280px] w-full object-cover rounded-3xl transition-transform duration-500 hover:scale-[1.03]"
            />
          </div>
        </div>
      </div>

      {/* SECTION CATÉGORIES */}
      <div className="flex gap-2">
        <p className="font-bold text-md text-primary">Nos </p>{" "}
        <p className="text-md font-bold">Catégories</p>
      </div>

      <div className="flex justify-between items-center gap-2 mt-2">
        {isCategoriesLoading && categories.length === 0 ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="py-2 flex-1 bg-gray-100 rounded-lg animate-pulse h-[33px]"
            />
          ))
        ) : categories.length > 0 ? (
          categories.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                router.push(`/shop?id=${item.id}`);
              }}
              className="py-2 flex-1 bg-white border border-gray-100 rounded-lg hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-pointer select-none group"
            >
              <p className="text-center text-[11px] text-black font-bold tracking-wide group-hover:scale-102 transition-transform">
                {item.name}
              </p>
            </button>
          ))
        ) : (
          <div className="w-full py-3 text-center text-xs text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            Catégories momentanément indisponibles.
          </div>
        )}
      </div>

      {/* SÉLECTEUR D'ONGLETS */}
      <div className="flex justify-start gap-5 mt-5">
        {tabs.map((item) => (
          <Button
            key={item}
            onClick={() => setTabActive(item)}
            className={`!bg-gray-200 !text-black ${item === tabActive ? "!bg-primary !text-white" : ""}`}
          >
            {item}
          </Button>
        ))}
      </div>

      {/* GRILLE PRODUITS (VRAIES DONNÉES ET SQUELETTES) */}
 <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {isLoading && products?.length === 0 ? (
    // Squelettes Produits pendant le chargement
    Array.from({ length: 8 }).map((_, index) => (
      <div
        key={index}
        className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-50 h-[290px] animate-pulse p-3 space-y-3"
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
  ) : displayedProducts && displayedProducts.length > 0 ? (
    displayedProducts.map((product) => (
      <Card key={product.id} product={product} />
    ))
  ) : (
    <div className="col-span-full py-12 text-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
      Aucun produit disponible pour le moment.
    </div>
  )}
</div>
    </div>
  );
}
