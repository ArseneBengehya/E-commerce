"use client";

import { useProductStore } from "@/app/store/useProductStore";
import { useEffect, useState } from "react";
import { CiTrash, CiSaveDown2, CiCircleRemove } from "react-icons/ci";

export default function ProductsAdminPage() {
  const { products, fetchProducts, addProduct, deleteProduct, updateStock, categories, fetchCategories } = useProductStore();
  const [editingStocks, setEditingStocks] = useState<Record<string, number>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Conversion explicite pour éviter les erreurs de type
    const productData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      image: formData.get("image") as string,
      stock: parseInt(formData.get("stock") as string),
      categoryId: formData.get("categoryId") as string,
    };

    await addProduct(productData);
    setIsModalOpen(false);
    e.currentTarget.reset();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* <div className="flex justify-between items-center">
        <div>
          <h1 className="text-sm font-black text-slate-900 uppercase tracking-wide">Gestion du catalogue</h1>
          <p className="text-[11px] text-slate-400">Ajoutez, modifiez ou retirez vos produits.</p>
        </div>
        <button 
          // onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition shadow-lg shadow-slate-200"
        >
           Nouveau Produit
        </button>
      </div> */}

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
                  <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover border border-slate-200" />
                </td>
                <td className="p-4 font-bold text-slate-700">${p.price.toFixed(2)}</td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <input 
                      type="number" 
                      defaultValue={p.stock}
                      onChange={(e) => setEditingStocks(prev => ({...prev, [p.id]: parseInt(e.target.value)}))}
                      className="w-16 border border-slate-200 rounded-lg px-2 py-1 text-center font-bold outline-none focus:border-slate-400" 
                    />
                    {editingStocks[p.id] !== undefined && (
                      <button onClick={() => updateStock(p.id, editingStocks[p.id])} className="text-blue-600 hover:text-blue-700">
                        <CiSaveDown2 size={18} />
                      </button>
                    )}
                  </div>
                </td>
                <td className="p-4 text-center">
                  <button onClick={() => deleteProduct(p.id)} className="text-rose-500 hover:bg-rose-50 p-2 rounded-full transition"><CiTrash size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL D'AJOUT AMÉLIORÉ */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <form onSubmit={handleAddProduct} className="bg-white p-8 rounded-3xl w-full max-w-sm space-y-4 shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-black text-slate-900 uppercase tracking-tight">Ajouter un produit</h2>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-900"><CiCircleRemove size={24} /></button>
            </div>
            
            <input name="name" placeholder="Nom du produit" className="w-full border border-slate-200 p-3 rounded-xl text-xs outline-none focus:border-slate-400" required />
            <textarea name="description" placeholder="Description courte" className="w-full border border-slate-200 p-3 rounded-xl text-xs outline-none focus:border-slate-400" />
            <div className="grid grid-cols-2 gap-2">
              <input name="price" type="number" placeholder="Prix" className="w-full border border-slate-200 p-3 rounded-xl text-xs outline-none" required />
              <input name="stock" type="number" placeholder="Stock" className="w-full border border-slate-200 p-3 rounded-xl text-xs outline-none" required />
            </div>
            <input name="image" placeholder="URL de l'image" className="w-full border border-slate-200 p-3 rounded-xl text-xs outline-none" required />
            
            <select name="categoryId" className="w-full border border-slate-200 p-3 rounded-xl text-xs outline-none bg-white" required>
              <option value="">Sélectionner une catégorie</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-xl text-xs font-black hover:bg-black transition mt-2">
              Confirmer la création
            </button>
          </form>
        </div>
      )}
    </div>
  );
}