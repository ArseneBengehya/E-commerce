"use client";

import EditCategorie from "@/app/components/EditCategorie";
import { useProductStore } from "@/app/store/useProductStore";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useMemo } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { useAppContext } from "../../../context/index";
import DeleteAlert from "@/app/components/DeleteAlert";
import { Button } from "@mantine/core";
import AddCategorie from "@/app/components/AddCategorie";

const UsersAdminPage = () => {
  const {
    categories,
    fetchCategories,
    isCategoriesLoading,
    isActionLoading,
    deleteCategory,
  } = useProductStore();

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [fetchCategories, categories.length]);
  const [openedEdit, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);
  const [openedDel, { open: openDel, close: closeDel }] = useDisclosure(false);
  const [openedAdd, { open: openAdd, close: closeAdd }] = useDisclosure(false);

  const { item, setItem, setId, id } = useAppContext();

  const categoriesFiltered = useMemo(() => {
    return categories.filter((c) => {
      return c && c.isDelete === false;
    });
  }, [categories]);

  if (isCategoriesLoading)
    return (
      <div className="p-4 text-sm text-slate-500">
        Chargement des categories...
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            Gestion des categories
          </h1>
          <p className="text-[11px] text-slate-400">
            Administrez les privilèges des membres inscrits.
          </p>
        </div>
        <Button
          className="!bg-primary"
          onClick={() => {
            openAdd();
          }}
        >
          Ajouter une nouvelle categorie
        </Button>
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
            {categoriesFiltered.map((item) => (
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
                    <button
                      className="text-green-500 hover:bg-green-50 p-2 rounded-full transition"
                      onClick={() => {
                        setItem(item);
                        openEdit();
                      }}
                    >
                      <CiEdit size={18} />
                    </button>
                    <button
                      className="text-rose-500 hover:bg-rose-50 p-2 rounded-full transition"
                      onClick={() => {
                        setId(item.id);
                        openDel();
                      }}
                    >
                      <CiTrash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EditCategorie
        opened={openedEdit}
        key={item?.id || "empty"}
        onClose={closeEdit}
        title="Modifier les infos la categorie"
        size="md"
      />

      <DeleteAlert
        opened={openedDel}
        onClose={closeDel}
        title="Suppression de la cetégorie"
        message="Voulez vous vraiment supprimer cette catégorie ?, cette action est irréversible et entrainera la suppression de produits liés à cette catégorie."
        delFunction={(id) => deleteCategory(id, closeDel)}
        isLoading={isActionLoading}
      />

      <AddCategorie
        opened={openedAdd}
        onClose={closeAdd}
        title="Ajouter une nouvelle la categorie"
        size="md"
      />
    </div>
  );
};

export default UsersAdminPage;
