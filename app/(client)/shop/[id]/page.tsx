"use client";

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

  const fakeCategories: Category[] = [
    { id: "1", name: "Tout explorer", slug: "all", icon: "✨" },
    { id: "2", name: "Électronique & Tech", slug: "tech", icon: "💻" },
    { id: "3", name: "Mode & Vêtements", slug: "fashion", icon: "🧥" },
    { id: "4", name: "Maison & Électroménager", slug: "home", icon: "🏠" },
    { id: "5", name: "Cosmétique & Beauté", slug: "beauty", icon: "🧴" },
  ];

  const fakeProducts: Product[] = [
    { id: "1", name: "iPhone 15 Pro Max", price: 1299, image: "https://images.unsplash.com/photo-1696446701215-9f1c8b5c8c3b?w=600", category: "tech" },
    { id: "2", name: "MacBook Pro M3", price: 1999, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600", category: "tech" },
    { id: "3", name: "Nike Air Force 1", price: 120, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600", category: "fashion" },
    { id: "4", name: "Sac Louis Style", price: 89, image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600", category: "fashion" },
    { id: "5", name: "Blender Cuisine Pro", price: 150, image: "https://images.unsplash.com/photo-1581600140682-d4e68c8cde32?w=600", category: "home" },
    { id: "6", name: "Lampe LED Smart", price: 45, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600", category: "home" },
    { id: "7", name: "Crème Hydratante Bio", price: 35, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600", category: "beauty" },
    { id: "8", name: "Parfum Élégance", price: 120, image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600", category: "beauty" },
  ];

  // Recherche du produit correspondant à l'ID de l'URL
  const product = fakeProducts.find((p) => p.id === id);

  // Si le produit n'existe pas
  if (!product) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-12 text-center space-y-3">
        <p className="text-xs font-bold text-muted uppercase tracking-wider">Produit introuvable</p>
        <button onClick={() => router.back()} className="text-[11px] font-bold text-primary flex items-center justify-center gap-1 mx-auto cursor-pointer">
          <MdArrowBack size={14} /> Retourner à la boutique
        </button>
      </div>
    );
  }

  // Trouve le nom lisible de la catégorie
  const productCategory = fakeCategories.find((c) => c.slug === product.category);

  const similarProducts = fakeProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

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
            Découvrez l'excellence avec cet article minutieusement sélectionné. Alliant robustesse, design ergonomique et performances haut de gamme, il répondra parfaitement à vos exigences quotidiennes.
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
                    <p className="font-black text-foreground text-xs">${similar.price}</p>
                    <span className="text-zinc-400 font-medium">Voir l'article</span>
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