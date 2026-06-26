"use client";
import React, { useMemo, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { Menu } from "@mantine/core";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import dataNotFound from "../../public/no-data-concept-illustration_86047-488.avif";
import { useDisclosure } from "@mantine/hooks";
import DeleteAlert from "./DeleteAlert";
import { useAppContext } from "../context";
import Image from "next/image";

interface TableProps {
  data: any[];
  colonnes: string[];
  deleteFunction?: (id: any) => void;
  updateFunction?: () => void;
  viewFunction?: () => void;
  deleteMessage?: string;
  otherComponent: boolean;
  deleteMenu?: "delete" | "disable";
  view?: boolean;
  edit?: boolean;
  del?: boolean;
}

const TablePage = ({
  data,
  colonnes,
  deleteFunction,
  updateFunction,
  viewFunction,
  otherComponent,
  deleteMessage,
  deleteMenu,
  view = true,
  edit = true,
  del = true,
}: TableProps) => {
  const keys = Object.keys(data[0] || {});
  keys.splice(keys.indexOf("id"), 1);

  const { setId, setItem } = useAppContext();

  const handleClique = (id: string, item: any) => {
    setId(id);
    setItem(item);
  };

  const [openedDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);

  const handleDelete = () => openDelete();

  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;

    return data.filter((item) =>
      keys.some((key) =>
        item[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [data, searchTerm, keys]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mt-4">
      <div className="overflow w-auto scrollbar-none">
        {/* Header Search + Print */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center w-full mb-2">
          <div className="flex gap-2 sm:gap-4 items-center w-full sm:w-auto">
            <span className="text-gray-700 font-semibold hidden md:block whitespace-nowrap">
              Recherche :
            </span>
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="focus:border-blue-400 dark:focus:border-blue-600 border w-full sm:w-64 md:w-72 lg:w-80 text-sm border-gray-200  outline-none transition-colors p-2 rounded-md font-medium h-10"
              placeholder="Cherche un élément..."
            />
          </div>
        </div>

        {/* Table */}
        <div className="rounded-lg min-h-72 overflow-hidden scrollbar-none overflow-x-auto">
          <table className="min-w-max w-full divide-gray-200 text-xs border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead className="sticky top-0 z-10 bg-gray-100 border-b border-gray-200 dark:border-gray-700">
              <tr>
                {colonnes && colonnes.length > 0 && (
                  <th className="w-16 px-4 py-3 text-left text-sm font-semibold border-b border-r border-gray-200 dark:border-gray-700">
                    Nᵒ
                  </th>
                )}
                {colonnes && colonnes.length > 0 ? (
                  colonnes.map((label) => (
                    <th
                      key={label}
                      className="px-4 py-3 text-left text-sm font-semibold border-b border-r border-gray-200 dark:border-gray-700"
                    >
                      {label}
                    </th>
                  ))
                ) : (
                  <th className="p-3 text-center">Aucune Colonne envoyée</th>
                )}
                {otherComponent && colonnes && colonnes.length > 0 && (
                  <th className="px-4 py-3 text-left text-sm font-semibold border-b border-r border-gray-200 dark:border-gray-700">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {filteredData && filteredData.length > 0 ? (
                filteredData.map((item, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-100 group border-b border-gray-200 
                               transition-colors duration-150
                                "
                  >
                    {/* N° */}
                    <td className="px-4 py-2 text-sm text-gray-700  whitespace-nowrap">
                      {idx + 1}
                    </td>

                    {/* Data Cells */}
                    {keys.map((key) => (
                      <td
                        key={key}
                        className="px-4 py-2 text-sm   whitespace-nowrap"
                      >
                        {key === "status" ? (
                          <div className="flex items-center gap-2 px-2 py-1 rounded-full text-xs font-semibold">
                            <span
                              className={`h-2.5 w-2.5 rounded-full ${
                                item.status === "Actif" ||
                                item.status === "Validé" ||
                                item.status === "À JOUR" ||
                                item.status === "À jour"
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                            />
                            <span className="text-gray-700 ">
                              {item.status}
                            </span>
                          </div>
                        ) : key === "is_active" ? (
                          <div className="flex items-center gap-2 px-2 py-1 rounded-full text-xs font-semibold">
                            <span
                              className={`h-2.5 w-2.5 rounded-full ${
                                item.is_active === "Oui"
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                            />
                            <span>{item.is_active}</span>
                          </div>
                        ) : key === "picture" ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={48}
                            height={48}
                            className="h-12 w-12 rounded-lg object-cover border"
                          />
                        ) : key === "quantity" ? (
                          <div className="flex items-center gap-2">
                            <button
                              className="h-7 w-7 rounded border flex items-center justify-center"
                              onClick={() => {
                                // ton action -
                              }}
                            >
                              -
                            </button>

                            <span className="min-w-6 text-center">
                              {item.quantity}
                            </span>

                            <button
                              className="h-7 w-7 rounded border flex items-center justify-center"
                              onClick={() => {
                                // ton action +
                              }}
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          item[key]
                        )}
                      </td>
                    ))}

                    {/* Actions Menu */}
                    {otherComponent && data && data.length > 0 && (
                      <td className="px-4 py-2 text-sm text-gray-700 ">
                        <Menu
                          transitionProps={{ duration: 120 }}
                          classNames={{
                            dropdown:
                              "!bg-white dark:!bg-gray-800 !shadow-xl !rounded-xl !border !border-gray-200 dark:!border-gray-700",
                            item: "hover:!bg-blue-50 dark:hover:!bg-blue-900/40 !transition-colors !px-4 !py-2 !rounded-lg !flex !items-center !gap-2 !text-gray-700 dark:!text-gray-100",
                          }}
                        >
                          <Menu.Target>
                            <button className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-150">
                              <CiMenuKebab size={16} />
                            </button>
                          </Menu.Target>
                          <Menu.Dropdown>
                            {view && (
                              <Menu.Item>
                                <button
                                  className="flex gap-2 items-center"
                                  onClick={() => {
                                    handleClique(item.id, item);
                                    viewFunction && viewFunction();
                                  }}
                                >
                                  <IoEyeOutline className="text-blue-600" />
                                  <span>Detail</span>
                                </button>
                              </Menu.Item>
                            )}
                            {edit && (
                              <Menu.Item>
                                <button
                                  className="flex gap-2 items-center"
                                  onClick={() => {
                                    handleClique(item.id, item);
                                    updateFunction && updateFunction();
                                  }}
                                >
                                  <AiOutlineEdit className="text-green-600" />
                                  <span>Modifier</span>
                                </button>
                              </Menu.Item>
                            )}
                            {del && (
                              <Menu.Item>
                                <button
                                  className="flex gap-2 items-center"
                                  onClick={() => {
                                    handleClique(item.id, item);
                                    handleDelete();
                                  }}
                                >
                                  <RiDeleteBinLine className="text-red-600" />
                                  Supprimer
                                </button>
                              </Menu.Item>
                            )}
                          </Menu.Dropdown>
                        </Menu>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={colonnes.length + (otherComponent ? 2 : 1)}>
                    <div className="flex flex-col items-center justify-center h-auto py-6 text-center select-none">
                      <Image
                        src={dataNotFound}
                        alt="Aucune donnée"
                        className="w-auto opacity-80 sm:w-52 rounded"
                        style={{ maxWidth: "320px" }}
                      />
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-3 font-medium">
                        Aucune donnée disponible
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alerts */}
      <DeleteAlert
        opened={openedDelete}
        onClose={closeDelete}
        title="Alert Suppression"
        size="md"
        message={deleteMessage || "Voulez vous supprimer cet item ?"}
        delFunction={deleteFunction}
      />
    </div>
  );
};

export default TablePage;
