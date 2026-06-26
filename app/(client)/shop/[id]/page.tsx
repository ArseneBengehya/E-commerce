"use client";

import { useProductStore } from "@/app/store/useProductStore";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { MdFavoriteBorder, MdArrowBack } from "react-icons/md";

type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

const ProductDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState<number>(1);
  const { products, metadata, isLoading, fetchProducts,categories, fetchCategories, isCategoriesLoading } = useProductStore();

  // Recherche du produit correspondant à l'ID de l'URL
  const product = products.find((p) => p.id === id);

  // Si le produit n'existe pas
  if (!product) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-12 text-center space-y-3">
        <p className="text-xs font-bold text-muted uppercase tracking-wider">
          Produit introuvable
        </p>
        <button
          onClick={() => router.back()}
          className="text-[11px] font-bold text-primary flex items-center justify-center gap-1 mx-auto cursor-pointer"
        >
          <MdArrowBack size={14} /> Retourner à la boutique
        </button>
      </div>
    );
  }

  // Détermine le slug de la catégorie du produit
  const productCategorySlug =
    typeof product.category === "string"
      ? product.category
      : product.category?.slug ?? "";

  const productCategory = categories.find(
    (c) => c.slug === productCategorySlug,
  );

  const similarProducts = products.filter((p) => {
    const pCategorySlug =
      typeof p.category === "string"
        ? p.category
        : p.category?.slug ?? "";

    return pCategorySlug === productCategorySlug && p.id !== product.id;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* BOUTON RETOUR DISCRET */}
      <button
        onClick={() => router.back()}
        className="mb-5 inline-flex items-center gap-1 text-[10px] font-bold text-muted uppercase tracking-wide hover:text-primary transition-colors cursor-pointer"
      >
        <MdArrowBack size={14} /> Retour
      </button>

      {/* DISPOSITION ASYMÉTRIQUE EN 2 COLONNES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* COLONNE GAUCHE : PHOTO DU PRODUIT */}
        <div className="w-full aspect-square max-h-[460px] rounded-xl overflow-hidden  border border-border/40 relative shadow-2xs group">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
          />
          {/* Badge de catégorie sur l'image */}
          {productCategory && (
            <span className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-xs text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md">
              {productCategory.icon} {productCategory.name}
            </span>
          )}
        </div>

        {/* COLONNE DROITE : INFORMATIONS & ACTIONS D'ACHAT */}
        <div className="flex flex-col gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Article Authentique
            </span>
            <h1 className="text-xl font-black tracking-tight text-foreground sm:text-2xl">
              {product.name}
            </h1>
          </div>

          {/* PRIX & STATUT */}
          <div className="flex items-center gap-4 border-b border-border/40 pb-4">
            <span className="text-2xl font-black text-foreground">
              ${product.price}
            </span>
            <span className="text-emerald-600 dark:text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md text-[10px] tracking-wide uppercase">
              Disponible en stock
            </span>
          </div>

          {/* DESCRIPTION COMPACTE FACTICE */}
          <p className="text-xs text-muted-foreground leading-relaxed max-w-md">
            Découvrez l'excellence avec cet article minutieusement sélectionné.
            Alliant robustesse, design ergonomique et performances haut de
            gamme, il répondra parfaitement à vos exigences quotidiennes.
          </p>

          {/* SÉLECTEUR DE QUANTITÉ & FAVORIS */}
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center border border-border/60  rounded-lg h-9 overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 text-zinc-500 h-full font-bold transition-colors text-xs"
              >
                -
              </button>
              <span className="px-3 text-xs font-bold text-foreground min-w-[32px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 text-zinc-500  h-full font-bold transition-colors text-xs"
              >
                +
              </button>
            </div>

            <button className="h-9 w-9 flex items-center justify-center border border-border/60  hover:border-red-500/50 hover:text-red-500 text-zinc-600 dark:text-zinc-400 rounded-lg shadow-2xs transition-all cursor-pointer">
              <MdFavoriteBorder size={18} />
            </button>
          </div>

          {/* ACTION PRINCIPALE : PANIER */}
          <div className="mt-2 pt-2 max-w-md">
            <button className="w-full h-10 flex items-center gap-2 justify-center bg-primary hover:bg-orange-600 active:scale-[0.99] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer">
              <span>Ajouter au panier</span>
              <CiShoppingCart size={20} className="stroke-1" />
            </button>
          </div>
        </div>
      </div>
      {similarProducts.length > 0 && (
        <div className=" pt-8 space-y-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Suggestions
            </span>
            <h3 className="text-sm font-black tracking-tight text-foreground uppercase">
              Produits similaires
            </h3>
          </div>

          {/* GRILLE DES ARTICLES ASSOCIÉS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {similarProducts.slice(0, 4).map((similar) => (
              <div
                key={similar.id}
                onClick={() => router.push(`/shop/${similar.id}`)} // Ajuste la route selon ton routing
                className=" border border-border/40 rounded-xl overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out flex flex-col justify-between cursor-pointer group"
              >
                {/* ZONE IMAGE */}
                <div className="h-36 overflow-hidden relative ">
                  <img
                    src={similar.image}
                    alt={similar.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                  />
                </div>

                {/* TEXTE COMPACT */}
                <div className="p-2.5 space-y-1">
                  <h4 className="text-[11px] font-bold text-foreground line-clamp-1 tracking-wide group-hover:text-primary transition-colors">
                    {similar.name}
                  </h4>
                  <div className="flex justify-between items-center text-[10px]">
                    <p className="font-black text-foreground text-xs">
                      ${similar.price}
                    </p>
                    <span className="text-zinc-400 font-medium">
                      Voir l'article
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
