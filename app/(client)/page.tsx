"use client";

import { useMemo, useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  sold: number;
};

const categories = [
  { label: "All", value: "all" },
  { label: "Electronics", value: "tech" },
  { label: "Fashion", value: "fashion" },
  { label: "Home", value: "home" },
  { label: "Beauty", value: "beauty" },
];

const products: Product[] = [
  {
    id: "1",
    name: "Smartphone Ultra Pro Max 5G",
    price: 999,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
    category: "tech",
    rating: 4.8,
    sold: 1200,
  },
  {
    id: "2",
    name: "Laptop Gaming RTX 4060",
    price: 1499,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800",
    category: "tech",
    rating: 4.7,
    sold: 800,
  },
  {
    id: "3",
    name: "Sneakers Street Edition",
    price: 120,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    category: "fashion",
    rating: 4.6,
    sold: 5400,
  },
  {
    id: "4",
    name: "Luxury Handbag Premium",
    price: 220,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800",
    category: "fashion",
    rating: 4.9,
    sold: 2100,
  },
  {
    id: "5",
    name: "Smart Blender AI Kitchen",
    price: 180,
    image: "https://images.unsplash.com/photo-1581600140682-d4e68c8cde32?w=800",
    category: "home",
    rating: 4.5,
    sold: 980,
  },
  {
    id: "6",
    name: "LED Smart Lamp Ambient",
    price: 45,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800",
    category: "home",
    rating: 4.3,
    sold: 3200,
  },
  {
    id: "7",
    name: "Organic Skin Care Serum",
    price: 60,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800",
    category: "beauty",
    rating: 4.9,
    sold: 4100,
  },
  {
    id: "8",
    name: "Luxury Perfume Collection",
    price: 130,
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800",
    category: "beauty",
    rating: 4.8,
    sold: 2900,
  },
];

export default function Home() {
  const [active, setActive] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = active === "all" || p.category === active;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [active, search]);

  return (
    <div className="">
      {/* CATEGORIES */}
      <div className="flex gap-2 overflow-x-auto px-4 py-3 border-b">
        {categories.map((c) => (
          <button
            key={c.value}
            onClick={() => setActive(c.value)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition ${
              active === c.value
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* PRODUCTS GRID */}
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="bg-header text-foreground rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
          >
            {/* IMAGE */}
            <div className="relative h-44 overflow-hidden">
              <img
                src={p.image}
                className="w-full h-full object-cover hover:scale-110 transition duration-500"
              />

              <div className="absolute top-2 left-2 bg-header text-foreground text-white text-xs px-2 py-1 rounded-full">
                ⭐ {p.rating}
              </div>

              <div className="absolute top-2 right-2 bg-header text-foreground text-black text-xs px-2 py-1 rounded-full">
                {p.sold}+ sold
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-3 flex flex-col gap-1">
              <h2 className="text-sm font-semibold line-clamp-2">{p.name}</h2>

              <p className="text-green-600 font-bold">${p.price}</p>

              <button className="mt-2 bg-black text-white py-2 rounded-xl text-sm hover:bg-gray-800 transition">
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
