"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CiTrash } from "react-icons/ci";

type Product = {
  id: string;
  name: string;
  price: number;
  picture: string;
  category: string;
  quantity: number;
};

const initialProducts: Product[] = [
  {
    id: "1",
    picture:
      "https://images.unsplash.com/photo-1696446701215-9f1c8b5c8c3b?w=600",
    name: "iPhone 15 Pro Max",
    price: 1299,
    quantity: 3,
    category: "tech",
  },
  {
    id: "2",
    picture:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600",
    name: "MacBook Pro M3",
    price: 1999,
    quantity: 3,
    category: "tech",
  },
  {
    id: "3",
    picture:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    name: "Nike Air Force 1",
    price: 120,
    quantity: 3,
    category: "fashion",
  },
  {
    id: "4",
    picture:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600",
    name: "Sac Louis Style",
    price: 89,
    quantity: 3,
    category: "fashion",
  },
  {
    id: "5",
    picture:
      "https://images.unsplash.com/photo-1581600140682-d4e68c8cde32?w=600",
    name: "Blender Cuisine Pro",
    price: 150,
    quantity: 3,
    category: "home",
  },
  {
    id: "6",
    picture:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600",
    name: "Lampe LED Smart",
    price: 45,
    quantity: 3,
    category: "home",
  },
  {
    id: "7",
    picture:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600",
    name: "Crème Hydratante Bio",
    price: 35,
    quantity: 3,
    category: "beauty",
  },
  {
    id: "8",
    picture:
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600",
    name: "Parfum Élégance",
    price: 120,
    quantity: 3,
    category: "beauty",
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(value);

const page = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [promoCode, setPromoCode] = useState("");
  const [deliveryNote, setDeliveryNote] = useState("");

  const cartTotal = useMemo(
    () => products.reduce((sum, product) => sum + product.price * product.quantity, 0),
    [products]
  );

  const deliveryFee = useMemo(() => Math.round(cartTotal * 0.15), [cartTotal]);
  const grandTotal = cartTotal + deliveryFee;

  const handleQuantityChange = (id: string, delta: number) => {
    setProducts((current) =>
      current.map((item) => {
        if (item.id !== id) return item;
        const nextQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: nextQuantity };
      })
    );
  };

  const handleConfirmUpdate = () => {
    // Placeholder pour validation côté client
    console.log("Mise à jour du panier confirmée", products);
  };

  return (
<div className="px-4 py-4 lg:px-16 bg-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-xl font-black text-slate-900 tracking-tight">Votre panier</h1>
        <p className="text-xs text-slate-500 mb-4">
          Ajustez les quantités, renseignez votre position, puis passez à la validation.
        </p>

        {/* TABLEAU COMPACT & ÉPURÉ */}
        <div className="overflow-hidden rounded-lg border border-slate-100 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-xs">
              <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-2">Produit</th>
                  <th className="px-3 py-2">Prix</th>
                  <th className="px-3 py-2">Quantité</th>
                  <th className="px-3 py-2">Total</th>
                  <th className="px-3 py-2 text-center w-12">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/40 transition-colors">
                    {/* Infos Produit */}
                    <td className="px-3 py-1.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.picture}
                          alt={product.name}
                          className="h-10 w-10 rounded-lg object-cover border border-slate-100 flex-shrink-0"
                        />
                        <div>
                          <p className="font-bold text-slate-900 line-clamp-1">{product.name}</p>
                          <p className="text-[10px] text-slate-400 capitalize">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    {/* Prix Unitaire */}
                    <td className="px-3 py-1.5 font-medium text-slate-700">
                      {formatCurrency(product.price)}
                    </td>
                    {/* Contrôle Quantité Compact */}
                    <td className="px-3 py-1.5">
                      <div className="inline-flex items-center rounded-md border border-slate-200 h-7 overflow-hidden bg-white">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(product.id, -1)}
                          className="px-2 h-full text-slate-500 hover:bg-slate-50 font-bold text-xs transition-colors cursor-pointer"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-slate-800">
                          {product.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(product.id, 1)}
                          className="px-2 h-full text-slate-500 hover:bg-slate-50 font-bold text-xs transition-colors cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    {/* Total par ligne */}
                    <td className="px-3 py-1.5 font-bold text-slate-900">
                      {formatCurrency(product.price * product.quantity)}
                    </td>
                    {/* Action Supprimer */}
                    <td className="px-3 py-1.5 text-center">
                      <button
                        type="button"
                        onClick={() => setProducts((current) => current.filter((item) => item.id !== product.id))}
                        className="p-1 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <CiTrash size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Actions bas de tableau */}
          <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/50 px-3 py-2 sm:flex-row sm:items-center sm:justify-between text-xs">
            <span className="text-slate-500 font-medium">
              {products.length} article{products.length > 1 ? "s" : ""} sélectionné{products.length > 1 ? "s" : ""}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleConfirmUpdate}
                className="rounded-md bg-slate-900 px-3 h-8 font-bold text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Mettre à jour
              </button>
              <button
                type="button"
                onClick={() => router.push("/shop")}
                className="rounded-md border border-slate-200 bg-white px-3 h-8 font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Continuer les achats
              </button>
            </div>
          </div>
        </div>

        {/* FORMULAIRE DE POSITION & RÉSUMÉ */}
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.3fr_0.9fr] items-start">
          
          {/* FORMULAIRE DE LIVRAISON COMPACT */}
          <div className="rounded-lg border border-slate-100 bg-white p-4 shadow-2xs">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-1">Informations de livraison</h2>
            <p className="text-[11px] text-slate-400 mb-4">Indiquez la position exacte pour la réception de votre commande.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Ville</label>
                <input
                  type="text"
                  placeholder="Ex: Bukavu, Goma..."
                  className="w-full h-8 rounded-md border border-slate-200 px-3 outline-none transition focus:border-primary text-slate-800"
                />
              </div>
              
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Commune / Quartier</label>
                <input
                  type="text"
                  placeholder="Ex: Ibanda, Ndosho..."
                  className="w-full h-8 rounded-md border border-slate-200 px-3 outline-none transition focus:border-primary text-slate-800"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="font-bold text-slate-700">Adresse complète ou repère de position</label>
                <input
                  type="text"
                  placeholder="Numéro d'avenue, nom de rue, immeuble ou référence claire..."
                  className="w-full h-8 rounded-md border border-slate-200 px-3 outline-none transition focus:border-primary text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* RÉSUMÉ DE LA COMMANDE COMPACT */}
          <div className="rounded-lg border border-slate-100 bg-slate-900 p-4 text-white shadow-2xs">
            <h2 className="text-sm font-bold text-white uppercase tracking-wide mb-3">Résumé de la commande</h2>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span>Sous-total</span>
                <span className="font-medium text-white">{formatCurrency(cartTotal)}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span>Frais de livraison</span>
                <span className="font-medium text-white">{formatCurrency(deliveryFee)}</span>
              </div>
              <div className="flex items-center justify-between pt-1 text-sm font-bold text-white">
                <span>Total estimé</span>
                <span className="text-base font-black text-white">{formatCurrency(grandTotal)}</span>
              </div>
            </div>
            
            <button
              type="button"
              className="mt-4 w-full h-9 rounded-md bg-primary font-bold text-xs uppercase tracking-wider text-white hover:bg-orange-600 transition-colors cursor-pointer"
            >
              Valider la commande
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default page;
