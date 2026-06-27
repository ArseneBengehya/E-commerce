"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CiTrash } from "react-icons/ci";
import { useCartStore } from "@/app/store/useCartStore";
import { useDisclosure, useMounted } from "@mantine/hooks";
import PaymentModal from "@/app/components/PaymentModal";

// Formateur monétaire en Dollars ($) cohérent avec tes fiches produits
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value);

const Page = () => {
  const router = useRouter();

  // RECONNEXION AUX VRAIES DONNÉES DE TON STORE ZUSTAND
  const { cart, updateQuantity, removeFromCart, getTotalPrice } =
    useCartStore();

  const isMounted = useMounted();

  const [openedAdd, { open: openAdd, close: closeAdd }] = useDisclosure(false);
  const handleAdd = () => {
    openAdd();
  };

  const [destination, setDestinatiojn] = useState({
    city: "",
    commune: "",
    adress: "",
  });

  const isDisabled =
    !destination.city.trim() ||
    !destination.adress.trim() ||
    !destination.commune.trim() ||
    !cart;

  // CALCULS DYNAMIQUES BASÉS SUR TON STORE
  const cartTotal = useMemo(() => getTotalPrice(), [cart, getTotalPrice]);
  const deliveryFee = useMemo(() => Math.round(cartTotal * 0.15), [cartTotal]);
  const grandTotal = cartTotal + deliveryFee;

  if (!isMounted) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-16 py-12 text-center text-xs font-semibold text-slate-400 animate-pulse">
        Chargement de votre panier...
      </div>
    );
  }

  // ÉCRAN SI LE PANIER EST VIDE
  if (cart.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-16 py-16 text-center space-y-4 bg-white">
        <h1 className="text-xl font-black text-slate-900 tracking-tight">
          Votre panier est vide
        </h1>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Vous n'avez ajouté aucun article pour le moment. Parcourez notre
          catalogue pour découvrir nos collections.
        </p>
        <button
          onClick={() => router.push("/shop")}
          className="inline-flex h-9 items-center justify-center rounded-lg bg-primary text-white font-bold text-xs px-6 hover:bg-orange-600 transition-colors cursor-pointer shadow-2xs"
        >
          Découvrir nos produits
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 py-4 lg:px-16 bg-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-xl font-black text-slate-900 tracking-tight">
          Votre panier
        </h1>
        <p className="text-xs text-slate-500 mb-4">
          Ajustez les quantités, renseignez votre position, puis passez à la
          validation.
        </p>

        {/* TABLEAU DES PRODUITS DU STORE */}
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
                {cart.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-slate-50/40 transition-colors"
                  >
                    {/* Infos Produit */}
                    <td className="px-3 py-1.5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 relative rounded-lg overflow-hidden border border-slate-100 flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 line-clamp-1">
                            {product.name}
                          </p>
                          <p
                            className={`font-semibold px-1.5 py-0.5 rounded-md text-[10px] w-fit ${
                              product.stock > 0
                                ? "text-emerald-600 dark:text-emerald-500 bg-emerald-500/10"
                                : "text-rose-600 dark:text-rose-500 bg-rose-500/10"
                            }`}
                          >
                            {product.stock > 0
                              ? "Disponible"
                              : "Rupture de stock"}
                          </p>
                        </div>
                      </div>
                    </td>
                    {/* Prix Unitaire */}
                    <td className="px-3 py-1.5 font-medium text-slate-700">
                      {formatCurrency(product.price)}
                    </td>
                    {/* Contrôle Quantité Connecté au Store */}
                    <td className="px-3 py-1.5">
                      <div className="inline-flex items-center rounded-md border border-slate-200 h-7 overflow-hidden bg-white">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product.id, product.quantity - 1)
                          }
                          className="px-2 h-full text-slate-500 hover:bg-slate-50 font-bold text-xs transition-colors cursor-pointer"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-slate-800">
                          {product.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product.id, product.quantity + 1)
                          }
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
                    {/* Action Supprimer liée au Store */}
                    <td className="px-3 py-1.5 text-center">
                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
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
              {cart.length} article{cart.length > 1 ? "s" : ""} sélectionné
              {cart.length > 1 ? "s" : ""}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => router.push("/shop")}
                className="rounded-md border border-slate-200 bg-white px-3 h-8 font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Continuer les achats
              </button>
            </div>
          </div>
        </div>

        {/* FORMULAIRE DE POSITION & RÉSUMÉ */}
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.3fr_0.9fr] items-start">
          {/* FORMULAIRE DE LIVRAISON */}
          <div className="rounded-lg border border-slate-100 bg-white p-4 shadow-2xs">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-1">
              Informations de livraison
            </h2>
            <p className="text-[11px] text-slate-400 mb-4">
              Indiquez la position exacte pour la réception de votre commande.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Ville</label>
                <input
                  type="text"
                  value={destination.city || ""}
                  onChange={(e) =>
                    setDestinatiojn((prev) => ({
                      ...prev,
                      city: e.target.value,
                    }))
                  }
                  placeholder="Ex: Bukavu, Goma..."
                  className="w-full h-8 rounded-md border border-slate-200 px-3 outline-none transition focus:border-primary text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">
                  Commune / Quartier
                </label>
                <input
                  type="text"
                  value={destination.commune || ""}
                  onChange={(e) =>
                    setDestinatiojn((prev) => ({
                      ...prev,
                      commune: e.target.value,
                    }))
                  }
                  placeholder="Ex: Ibanda, Ndosho..."
                  className="w-full h-8 rounded-md border border-slate-200 px-3 outline-none transition focus:border-primary text-slate-800"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="font-bold text-slate-700">
                  Adresse complète ou repère de position
                </label>
                <input
                  type="text"
                  value={destination.adress || ""}
                  onChange={(e) =>
                    setDestinatiojn((prev) => ({
                      ...prev,
                      adress: e.target.value,
                    }))
                  }
                  placeholder="Numéro d'avenue, nom de rue, immeuble ou référence claire..."
                  className="w-full h-8 rounded-md border border-slate-200 px-3 outline-none transition focus:border-primary text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* RÉSUMÉ DE LA COMMANDE COMPACT DYNAMIQUE */}
          <div className="rounded-lg border border-slate-100 bg-slate-900 p-4 text-white shadow-2xs">
            <h2 className="text-sm font-bold text-white uppercase tracking-wide mb-3">
              Résumé de la commande
            </h2>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span>Sous-total</span>
                <span className="font-medium text-white">
                  {formatCurrency(cartTotal)}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span>Frais de livraison (15%)</span>
                <span className="font-medium text-white">
                  {formatCurrency(deliveryFee)}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1 text-sm font-bold text-white">
                <span>Total estimé</span>
                <span className="text-base font-black text-white">
                  {formatCurrency(grandTotal)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              disabled={isDisabled}
              className={`mt-4 w-full h-9 rounded-md bg-primary font-bold text-xs uppercase tracking-wider text-white hover:bg-orange-600 transition-colors cursor-pointer ${isDisabled ? "!bg-gray-200 !text-black !cursor-not-allowed" : ""}`}
            >
              Valider la commande
            </button>
          </div>
        </div>
      </div>
      <PaymentModal
        opened={openedAdd}
        onClose={closeAdd}
        title="Methode de paiement"
        size="lg"
        form={destination}
      />
    </div>
  );
};

export default Page;
