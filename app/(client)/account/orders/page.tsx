"use client";

import React, { useState } from "react";
import { CiClock2, CiDeliveryTruck, CiCircleCheck, CiCircleAlert } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";

// Structure type d'une commande
type Order = {
  id: string;
  date: string;
  itemsCount: number;
  totalPrice: number;
  status: "pending" | "processing" | "delivered" | "cancelled";
  deliveryAddress: string;
};

// Données fictives réalistes pour le rendu visuel
const mockOrders: Order[] = [
  {
    id: "CMD-2026-9481",
    date: "24 Juin 2026",
    itemsCount: 2,
    totalPrice: 1419,
    status: "processing",
    deliveryAddress: "Ibanda, Avenue Maniema, Bukavu",
  },
  {
    id: "CMD-2026-8310",
    date: "18 Juin 2026",
    itemsCount: 1,
    totalPrice: 120,
    status: "delivered",
    deliveryAddress: "Ndosho, Goma",
  },
  {
    id: "CMD-2026-7122",
    date: "05 Juin 2026",
    itemsCount: 4,
    totalPrice: 440,
    status: "cancelled",
    deliveryAddress: "Muhumba, Bagira, Bukavu",
  },
  {
    id: "CMD-2026-5039",
    date: "29 Mai 2026",
    itemsCount: 1,
    totalPrice: 1999,
    status: "pending",
    deliveryAddress: "Ibanda, Av. P.E. Lumumba, Bukavu",
  },
];

const OrdersPage = () => {
  const [orders] = useState<Order[]>(mockOrders);

  // Formateur monétaire en Dollars ($)
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);

  // Gestionnaire de couleur et icône selon le statut de la commande
  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-500 px-2 py-0.5 rounded-md font-bold text-[10px]">
            <CiClock2 size={12} /> En attente
          </span>
        );
      case "processing":
        return (
          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 px-2 py-0.5 rounded-md font-bold text-[10px]">
            <CiDeliveryTruck size={12} /> En cours
          </span>
        );
      case "delivered":
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-500 px-2 py-0.5 rounded-md font-bold text-[10px]">
            <CiCircleCheck size={12} /> Livré
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-500 px-2 py-0.5 rounded-md font-bold text-[10px]">
            <CiCircleAlert size={12} /> Annulé
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            Historique des commandes
          </h1>
          <p className="text-[11px] text-slate-400">
            Suivez l'état de vos livraisons et consultez vos anciennes factures.
          </p>
        </div>
        <div className="text-[11px] text-slate-500 font-medium self-start sm:self-center">
          {orders.length} commande{orders.length > 1 ? "s" : ""} trouvée{orders.length > 1 ? "s" : ""}
        </div>
      </div>

      {/* TABLEAU MODERN & MINIMALISTE */}
      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-xs">
            <thead className="bg-slate-50/60 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-4 py-2.5">ID Commande</th>
                <th className="px-4 py-2.5">Date</th>
                <th className="px-4 py-2.5">Articles</th>
                <th className="px-4 py-2.5">Destination</th>
                <th className="px-4 py-2.5">Montant</th>
                <th className="px-4 py-2.5">Statut</th>
                <th className="px-4 py-2.5 text-center w-12">Détails</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/30 transition-colors">
                  {/* ID de la Commande */}
                  <td className="px-4 py-3 font-bold text-slate-900 tracking-tight">
                    {order.id}
                  </td>
                  
                  {/* Date de création */}
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                    {order.date}
                  </td>
                  
                  {/* Nombre d'articles */}
                  <td className="px-4 py-3 text-slate-600 font-medium">
                    {order.itemsCount} article{order.itemsCount > 1 ? "s" : ""}
                  </td>
                  
                  {/* Adresse ou repère */}
                  <td className="px-4 py-3 text-slate-500 font-medium max-w-[180px] truncate">
                    {order.deliveryAddress}
                  </td>
                  
                  {/* Prix Total de la commande */}
                  <td className="px-4 py-3 font-black text-slate-900">
                    {formatCurrency(order.totalPrice)}
                  </td>
                  
                  {/* Badge de statut */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>
                  
                  {/* Lien d'action ou bouton œil */}
                  <td className="px-4 py-3 text-center">
                    <button
                      type="button"
                      onClick={() => console.log(`Voir la commande ${order.id}`)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-orange-500/5 transition-all cursor-pointer inline-flex items-center justify-center"
                      title="Consulter les détails"
                    >
                      <IoEyeOutline size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;