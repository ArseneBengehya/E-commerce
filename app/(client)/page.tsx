"use client";
import { Button } from "@mantine/core";
import { useState } from "react";
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

export default function Home() {
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
      image:
        "https://images.unsplash.com/photo-1696446701215-9f1c8b5c8c3b?w=600",
      category: "tech",
    },
    {
      id: "2",
      name: "MacBook Pro M3",
      price: 1999,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600",
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
      image:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600",
      category: "fashion",
    },
    {
      id: "5",
      name: "Blender Cuisine Pro",
      price: 150,
      image:
        "https://images.unsplash.com/photo-1581600140682-d4e68c8cde32?w=600",
      category: "home",
    },
    {
      id: "6",
      name: "Lampe LED Smart",
      price: 45,
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600",
      category: "home",
    },
    {
      id: "7",
      name: "Crème Hydratante Bio",
      price: 35,
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600",
      category: "beauty",
    },
    {
      id: "8",
      name: "Parfum Élégance",
      price: 120,
      image:
        "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600",
      category: "beauty",
    },
  ];

  const tabs = ["Vedette", "Recents", "Anciens"];
  const [tabActive, setTabActive] = useState("Vedette");

  return (
    <div className="w-full px-6 lg:px-20 mt-2">
      <div className="relative overflow-x-auto">
        <div className="grid lg:grid-cols-2 items-center gap-8 p-8 lg:p-12">
          {/* TEXT */}
          <div className="space-y-4">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary">
              🔥 Hot Promotions
            </span>

            <div>
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-foreground">
                Fashion
              </h1>

              <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-primary">
                Trending Collection
              </h1>
            </div>

            <p className="max-w-md text-muted">
              Discover the newest fashion arrivals with exclusive discounts,
              premium quality products and fast delivery.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <Button size="md" className="!bg-primary px-6">
                Shop Now
              </Button>

              <span className="text-sm font-medium text-muted">
                Up to 20% OFF
              </span>
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative flex justify-center">
            <div className="absolute h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&q=80"
              alt="Fashion Collection"
              className="relative z-10 h-[280px] object-cover rounded-3xl transition-transform duration-500 hover:scale-[1.03]"
            />
          </div>
        </div>
      </div>

      {/* categories */}
      <div className="flex gap-2">
        <p className="font-bold text-md text-primary">Nos </p>{" "}
        <p className="text-md font-bold">Categories</p>
      </div>
      <div className="flex justify-between items-center gap-2">
        {fakeCategories.map((item) => (
          <div
            key={item.id}
            className="py-2 flex-1 bg-white rounded-lg hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-pointer select-none group"
          >
            <p className="text-center text-[11px] text-black font-bold tracking-wide group-hover:scale-102 transition-transform">
              {item.name}
            </p>
          </div>
        ))}
      </div>

      {/* few products and a little filter */}
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
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {fakeProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <div className="h-40 overflow-hidden relative group/img">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300 ease-out"
              />

              {/* BOUTON FAVORIS POSITIONNÉ EN HAUT À DROITE */}
              <button
                className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xs text-zinc-700 dark:text-zinc-300 hover:text-red-500 hover:bg-white dark:hover:bg-zinc-900 shadow-2xs transition-all cursor-pointer z-10"
                onClick={(e) => {
                  e.stopPropagation(); // Évite de déclencher le clic vers la page produit
                  // Ta logique pour ajouter aux favoris ici
                }}
              >
                <MdFavoriteBorder size={16} />
              </button>
            </div>

            <div className="p-3">
              <h2 className="text-sm font-semibold line-clamp-2">
                {product.name}
              </h2>

              <div className="flex justify-between items-center">
                <p className="font-bold mt-1">${product.price}</p>

                <p>Disponible</p>
              </div>

              <button className="mt-2 w-full flex items-center gap-1 justify-center bg-primary text-white text-sm py-1 rounded-lg">
                <p>Ajouter au panier</p> <CiShoppingCart size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
