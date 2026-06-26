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
    <div className="px-3 py-5 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Votre panier</h1>
        <p className="text-sm text-slate-500 mb-8">
          Vérifiez vos produits, ajustez les quantités, puis passez à la validation.
        </p>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-[0.12em] text-xs">
                <tr>
                  <th className="px-4 py-4">Produit</th>
                  <th className="px-4 py-4">Prix unitaire</th>
                  <th className="px-4 py-4">Quantité</th>
                  <th className="px-4 py-4">Total</th>
                  <th className="px-4 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={product.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}
                  >
                    <td className="px-4 py-1">
                      <div className="flex items-center gap-4">
                        <img
                          src={product.picture}
                          alt={product.name}
                          className="h-15 w-15 rounded-3xl object-cover border border-slate-200"
                        />
                        <div>
                          <p className="font-semibold text-slate-900">{product.name}</p>
                          <p className="text-xs text-slate-500 capitalize">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-1 font-semibold text-slate-900">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="px-4 py-5">
                      <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 shadow-sm">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(product.id, -1)}
                          className="h-9 w-9 rounded-l-full bg-white text-slate-600 transition hover:bg-slate-100"
                        >
                          −
                        </button>
                        <span className="h-9 w-12 flex items-center justify-center text-sm font-semibold text-slate-900">
                          {product.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(product.id, 1)}
                          className="h-9 w-9 rounded-r-full bg-white text-slate-600 transition hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-5 font-semibold text-slate-900">
                      {formatCurrency(product.price * product.quantity)}
                    </td>
                    <td className="px-4 py-5">
                      <button
                        type="button"
                        onClick={() => setProducts((current) => current.filter((item) => item.id !== product.id))}
                        className="rounded-full border border-red-200 bg-red-50 px-2 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                      >
                       <CiTrash size={24}/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-slate-600">
              {products.length} article{products.length > 1 ? "s" : ""} dans le panier
            </span>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleConfirmUpdate}
                className="inline-flex items-center justify-center rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Confirmer la mise à jour
              </button>
              <button
                type="button"
                onClick={() => router.push("/shop")}
                className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Continuer à faire du shopping
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Calculate shopping</h2>
            <p className="mb-6 text-sm text-slate-500">
              Ajoutez un code promo ou une note de livraison pour personnaliser votre commande.
            </p>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Code promotionnel
                <input
                  type="text"
                  value={promoCode}
                  onChange={(event) => setPromoCode(event.target.value)}
                  placeholder="Entrez votre code"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Instructions de livraison
                <textarea
                  value={deliveryNote}
                  onChange={(event) => setDeliveryNote(event.target.value)}
                  placeholder="Ex : étage, sonnette, point de retrait..."
                  className="mt-2 min-h-[120px] w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </label>
            </div>
          </div>

          <div className="rounded-md border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
            <h2 className="text-lg font-semibold text-white mb-4">Résumé de la commande</h2>
            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span>Sous-total</span>
                <span>{formatCurrency(cartTotal)}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span>Frais de livraison</span>
                <span>{formatCurrency(deliveryFee)}</span>
              </div>
              <div className="flex items-center justify-between pt-3 text-base font-semibold text-white">
                <span>Total estimé</span>
                <span>{formatCurrency(grandTotal)}</span>
              </div>
            </div>
            <button
              type="button"
              className="mt-6 w-full rounded-md bg-primary px-3 py-2 text-sm font-black uppercase tracking-[0.16em] text-white shadow-xl shadow-primary/20 transition hover:bg-orange-600"
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
