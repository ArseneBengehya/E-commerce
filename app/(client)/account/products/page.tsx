"use client";

import AddProduct from "@/app/components/AddProduct";
import DeleteAlert from "@/app/components/DeleteAlert";
import EditProduct from "@/app/components/EditProduct";
import { useAppContext } from "@/app/context";
import { useProductStore } from "@/app/store/useProductStore";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useMemo, useState } from "react";
import { CiTrash, CiSaveDown2, CiCircleRemove, CiEdit } from "react-icons/ci";

export default function ProductsAdminPage() {
  const {
    products,
    fetchProducts,
    deleteProduct,
    updateStock,
    fetchCategories,
    isActionLoading,
  } = useProductStore();
  const [editingStocks, setEditingStocks] = useState<Record<string, number>>(
    {},
  );

  const [openedDel, { open: openDel, close: closeDel }] = useDisclosure(false);
  const { item, setItem, id, setId } = useAppContext();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const [openedAdd, { open: openAdd, close: closeAdd }] = useDisclosure(false);
  const [openedEdit, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-sm font-black text-slate-900 uppercase tracking-wide">
            Gestion du catalogue
          </h1>
          <p className="text-[11px] text-slate-400">
            Ajoutez, modifiez ou retirez vos produits.
          </p>
        </div>
        <button
          onClick={() => openAdd()}
          className="flex items-center gap-2 bg-primary text-white px-2 py-1 rounded-sm text-xs font-bold  transition shadow-lg shadow-slate-200"
        >
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
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-semibold text-slate-800">{p.name}</td>
                <td className="p-4">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                  />
                </td>
                <td className="p-4 font-bold text-slate-700">
                  ${p.price.toFixed(2)}
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <input
                      type="number"
                      defaultValue={p.stock}
                      onChange={(e) =>
                        setEditingStocks((prev) => ({
                          ...prev,
                          [p.id]: parseInt(e.target.value),
                        }))
                      }
                      className="w-16 border border-slate-200 rounded-lg px-2 py-1 text-center font-bold outline-none focus:border-slate-400"
                    />
                    {editingStocks[p.id] !== undefined && (
                      <button
                        onClick={() => updateStock(p.id, editingStocks[p.id])}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <CiSaveDown2 size={18} />
                      </button>
                    )}
                  </div>
                </td>
                <td className="p-4 text-center">
                  <button className="text-green-500 hover:bg-green-50 p-2 rounded-full transition">
                    <CiEdit
                      size={18}
                      onClick={() => {
                        setItem(p);
                        openEdit();
                      }}
                    />
                  </button>
                  <button
                    onClick={() => {
                      setId(p.id);
                      openDel();
                      setItem(p)
                    }}
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

      <AddProduct
        opened={openedAdd}
        onClose={closeAdd}
        title="Ajouter un nouveau produit"
        size="md"
      />

      <EditProduct
        opened={openedEdit}
        onClose={closeEdit}
        key={item?.id || "empty"}
        title="Modifier un produit"
        size="md"
      />

      <DeleteAlert
        opened={openedDel}
        onClose={closeDel}
        title="Suppression de la cetégorie"
        message={`Voulez vous vraiment supprimer ${item.name} ?, cette action est irréversible.`}
        delFunction={(id) => deleteProduct(id, closeDel)}
        isLoading={isActionLoading}
      />
    </div>
  );
}
