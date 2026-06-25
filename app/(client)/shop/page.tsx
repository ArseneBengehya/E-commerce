"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { CiShoppingCart } from "react-icons/ci";
import { MdFavoriteBorder } from "react-icons/md";

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

const Page = () => {
  const fakeCategories: Category[] = [
    { id: "1", name: "Tout explorer", slug: "all", icon: "✨" },
    { id: "2", name: "Électronique & Tech", slug: "tech", icon: "💻" },
    { id: "3", name: "Mode & Vêtements", slug: "fashion", icon: "🧥" },
    { id: "4", name: "Maison & Électroménager", slug: "home", icon: "🏠" },
    { id: "5", name: "Cosmétique & Beauté", slug: "beauty", icon: "🧴" },
  ];

  const fakeProducts: Product[] = [
    {
      id: "1",
      name: "iPhone 15 Pro Max",
      price: 1299,
      image: "https://images.unsplash.com/photo-1696446701215-9f1c8b5c8c3b?w=600",
      category: "tech",
    },
    {
      id: "2",
      name: "MacBook Pro M3",
      price: 1999,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600",
      category: "tech",
    },
    {
      id: "3",
      name: "Nike Air Force 1",
      price: 120,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
      category: "fashion",
    },
    {
      id: "4",
      name: "Sac Louis Style",
      price: 89,
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600",
      category: "fashion",
    },
    {
      id: "5",
      name: "Blender Cuisine Pro",
      price: 150,
      image: "https://images.unsplash.com/photo-1581600140682-d4e68c8cde32?w=600",
      category: "home",
    },
    {
      id: "6",
      name: "Lampe LED Smart",
      price: 45,
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600",
      category: "home",
    },
    {
      id: "7",
      name: "Crème Hydratante Bio",
      price: 35,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600",
      category: "beauty",
    },
    {
      id: "8",
      name: "Parfum Élégance",
      price: 120,
      image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600",
      category: "beauty",
    },
  ];

  const router = useRouter()

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* COMPTEUR DE PRODUITS */}
      <p className="text-[11px] font-medium text-muted tracking-wide uppercase px-1">
        Nous avons trouvé <span className="text-primary font-black">{fakeProducts.length}</span> produits
      </p>

      {/* GRILLE DE PRODUITS */}
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {fakeProducts.map((product) => (
          <button
          onClick={()=>{
            router.push(`/shop/${product.id}`)
          }}
            key={product.id}
            className=" rounded-xl overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out flex flex-col justify-between"
          >
            {/* ZONE IMAGE */}
            <div className="h-40 overflow-hidden relative group/img ">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300 ease-out"
              />

              {/* BOUTON FAVORIS */}
              <button
                className="absolute top-2 right-2 p-1.5 rounded- shadow-2xs transition-all cursor-pointer z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  // Logique favoris
                }}
              >
                <MdFavoriteBorder size={15} />
              </button>
            </div>

            {/* CONTENU TEXTE */}
            <div className="p-3 flex-1 flex flex-col justify-between gap-2">
              <div className="space-y-1">
                <h2 className="text-xs font-bold text-foreground line-clamp-1 tracking-wide">
                  {product.name}
                </h2>

                <div className="flex justify-between items-center text-[11px]">
                  <p className="font-black text-foreground text-sm">${product.price}</p>
                  <p className="text-emerald-600 dark:text-emerald-500 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded-md text-[10px]">
                    Disponible
                  </p>
                </div>
              </div>

              {/* BOUTON D'ACTION */}
              <button className="w-full flex items-center gap-1.5 justify-center bg-primary hover:bg-orange-600 active:scale-[0.98] text-white text-[11px] font-bold py-1.5 rounded-lg transition-all cursor-pointer shadow-2xs">
                <span>Ajouter au panier</span> 
                <CiShoppingCart size={16} />
              </button>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Page;