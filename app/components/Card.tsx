"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { CiShoppingCart } from "react-icons/ci";
import { MdFavoriteBorder } from "react-icons/md";
import { useCartStore } from "../store/useCartStore";

interface ProductProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    stock?: number;
  };
}

export const Card = ({ product }: ProductProps) => {
  const router = useRouter();
  const { addToCart } = useCartStore();

  return (
    <button
      onClick={() => {
        router.push(`/shop/${product.id}`);
      }}
      className="rounded-xl overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out flex flex-col justify-between text-left w-full h-full bg-white"
    >
      {/* ZONE IMAGE */}
      <div className="h-40 overflow-hidden relative group/img w-full">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300 ease-out"
        />

        {/* BOUTON FAVORIS */}
        <button
          type="button"
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xs text-zinc-700 dark:text-zinc-300 hover:text-red-500 hover:bg-white dark:hover:bg-zinc-900 shadow-2xs transition-all cursor-pointer z-10"
          onClick={(e) => {
            e.stopPropagation();
            // Logique favoris à venir
          }}
        >
          <MdFavoriteBorder size={15} />
        </button>
      </div>

      {/* CONTENU TEXTE */}
      <div className="p-3 flex-1 flex flex-col justify-between gap-2 w-full">
        <div className="space-y-1">
          <h2 className="text-xs font-bold text-foreground line-clamp-1 tracking-wide">
            {product.name}
          </h2>

          <div className="flex justify-between items-center text-[11px]">
            <p className="font-black text-foreground text-sm">
              ${product.price}
            </p>
            <p className="text-emerald-600 dark:text-emerald-500 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded-md text-[10px]">
              Disponible
            </p>
          </div>
        </div>

        {/* BOUTON D'ACTION AJOUTER AU PANIER */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              stock: product.stock || 10,
            });
          }}
          className="w-full flex items-center gap-1.5 justify-center bg-primary hover:bg-orange-600 active:scale-[0.98] text-white text-[11px] font-bold py-1.5 rounded-lg transition-all cursor-pointer shadow-2xs"
        >
          <span>Ajouter au panier</span>
          <CiShoppingCart size={16} />
        </button>
      </div>
    </button>
  );
};