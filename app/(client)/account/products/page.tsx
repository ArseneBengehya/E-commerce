"use client";

import { useProductStore } from "@/app/store/useProductStore";
import { useEffect, useState } from "react";
import { CiTrash, CiSaveDown2 } from "react-icons/ci";

export default function ProductsAdminPage() {
  const { products, fetchProducts, deleteProduct, updateStock } = useProductStore();
  const [editingStocks, setEditingStocks] = useState<Record<string, number>>({});

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleStockChange = (id: string, value: string) => {
    setEditingStocks((prev) => ({ ...prev, [id]: parseInt(value) }));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-black text-slate-900 uppercase tracking-wide">Gestion des produits</h1>
          <p className="text-xs text-slate-400">Gérez votre inventaire et vos prix.</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-800 transition">
           Nouveau Produit
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-100 uppercase text-slate-500 font-bold">
            <tr>
              <th className="p-4">Produit</th>
              <th className="p-4">Image</th>
              <th className="p-4">Prix</th>
              <th className="p-4 text-center">Stock</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/50 transition">
                <td className="p-4 font-semibold text-slate-800">{p.name}</td>
                <td className="p-4">
                  <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover border" />
                </td>
                <td className="p-4 font-bold text-slate-700">${p.price}</td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <input 
                      type="number" 
                      defaultValue={p.stock}
                      onChange={(e) => handleStockChange(p.id, e.target.value)}
                      className="w-16 border rounded-lg px-2 py-1 text-center font-bold" 
                    />
                    {editingStocks[p.id] !== undefined && (
                      <button 
                        onClick={() => updateStock(p.id, editingStocks[p.id])}
                        className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-full transition"
                        title="Enregistrer"
                      >
                        <CiSaveDown2 size={18} />
                      </button>
                    )}
                  </div>
                </td>
                <td className="p-4 text-center">
                  <button 
                    onClick={() => deleteProduct(p.id)} 
                    className="text-rose-500 hover:bg-rose-50 p-2 rounded-full transition"
                  >
                    <CiTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}