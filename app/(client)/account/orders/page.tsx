"use client";

import { useOrderStore } from "@/app/store/useOrderStore";
import React, { useEffect } from "react"; // Suppression de useState inutile
import { CiClock2, CiDeliveryTruck, CiCircleCheck, CiCircleAlert } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";

const OrdersPage = () => {
  const { myOrders, isLoading, fetchOrders } = useOrderStore(); // Correction : c'est 'orders' et non 'myOrders' selon ton store précédent

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);

  // Correction du type ici pour correspondre à ton enum ou status Prisma
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md font-bold text-[10px]">
            <CiClock2 size={12} /> En attente
          </span>
        );
      case "processing":
        return (
          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-bold text-[10px]">
            <CiDeliveryTruck size={12} /> En cours
          </span>
        );
      case "paid": // Ajout car ton status est souvent 'PAID'
      case "delivered":
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-bold text-[10px]">
            <CiCircleCheck size={12} /> {status === 'paid' ? 'Payé' : 'Livré'}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 px-2 py-0.5 rounded-md font-bold text-[10px]">
            <CiCircleAlert size={12} /> {status}
          </span>
        );
    }
  };

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            Historique des commandes
          </h1>
        </div>
        <div className="text-[11px] text-slate-500 font-medium">
          {myOrders.length} commande{myOrders.length > 1 ? "s" : ""}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-xs">
            <thead className="bg-slate-50/60 border-b border-slate-100 text-slate-500 font-bold uppercase">
              <tr>
                <th className="px-4 py-2.5">ID Commande</th>
                <th className="px-4 py-2.5">Date</th>
                <th className="px-4 py-2.5">Articles</th>
                <th className="px-4 py-2.5">Destination</th>
                <th className="px-4 py-2.5">Montant</th>
                <th className="px-4 py-2.5">Statut</th>
                <th className="px-4 py-2.5 text-center">Détails</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {myOrders.map((order: any) => (
                <tr key={order.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-900">
                    {order.id.slice(-6).toUpperCase()} {/* ID plus lisible */}
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {order.items?.length || 0} articles
                  </td>
                  <td className="px-4 py-3 text-slate-500 truncate max-w-[150px]">
                    {order.address}, {order.commune}
                  </td>
                  <td className="px-4 py-3 font-black text-slate-900">
                    {formatCurrency(order.totalAmount)}
                  </td>
                  <td className="px-4 py-3">{getStatusBadge(order.status)}</td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-slate-400 hover:text-orange-600 transition-colors">
                      <IoEyeOutline size={16} />
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