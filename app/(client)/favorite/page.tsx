"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/app/components/Card";
import { useFavoriteStore } from "@/app/store/useFavoriteStore";
import { useMounted } from "@mantine/hooks";

const Page = () => {
  const router = useRouter();
  const { favorites } = useFavoriteStore();
  const isMounted = useMounted();

  if (!isMounted) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-xs font-semibold text-slate-400 animate-pulse">
        Chargement de vos favoris...
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4 bg-white">
        <h1 className="text-xl font-black text-slate-900 tracking-tight">
          Aucun coup de cœur
        </h1>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Votre liste d'envies est actuellement vide. Explorez notre catalogue
          et enregistrez vos articles préférés ici.
        </p>
        <button
          onClick={() => router.push("/shop")}
          className="inline-flex h-9 items-center justify-center rounded-lg bg-primary text-white font-bold text-xs px-6 hover:bg-orange-600 transition-colors cursor-pointer shadow-2xs"
        >
          Retourner à la boutique
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
      <div>
        <h1 className="text-xl font-black text-slate-900 tracking-tight">
          Mes Articles Favoris
        </h1>
        <p className="text-xs text-slate-500">
          Retrouvez ici tous les produits que vous avez aimés. Vous pouvez les
          ajouter directement au panier.
        </p>
      </div>

      {/* GRILLE DE PRODUITS FAVORIS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-2">
        {favorites.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Page;
