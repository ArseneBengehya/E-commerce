"use client";

import { useProductStore } from "@/app/store/useProductStore";
import { useUserStore } from "@/app/store/useUserStore";
import { useEffect } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";

const UsersAdminPage = () => {
  const {
    categories,
    fetchCategories,
    isCategoriesLoading,
  } = useProductStore();

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [fetchCategories, categories.length]);

  console.log(categories);

  if (isCategoriesLoading)
    return (
      <div className="p-4 text-sm text-slate-500">
        Chargement des categories...
      </div>
    );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
          Gestion des categories
        </h1>
        <p className="text-[11px] text-slate-400">
          Administrez les privilèges des membres inscrits.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
        <table className="min-w-full text-left text-xs">
          <thead className="bg-slate-50/60 border-b border-slate-100 text-slate-500 font-bold uppercase">
            <tr>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">slug</th>
              <th className="px-4 py-3">Produit Total</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {categories.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50/30 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-slate-900">
                  {item.name || "Sans nom"}
                </td>
                <td className="px-4 py-3 text-slate-500">{item.slug}</td>
                <td className="px-4 py-3">{item.products.length}</td>
                <td className="px-4 py-3 font-medium text-slate-900">
                  <div className="flex gap-3 items-center">
                    <button className="text-green-500 hover:bg-green-50 p-2 rounded-full transition">
                      <CiEdit size={18} />
                    </button>
                    <button className="text-rose-500 hover:bg-rose-50 p-2 rounded-full transition">
                      <CiTrash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersAdminPage;
