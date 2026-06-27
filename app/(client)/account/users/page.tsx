"use client";

import { useUserStore } from "@/app/store/useUserStore";
import { useEffect } from "react";

const UsersAdminPage = () => {
  const { users, isLoading, fetchUsers, updateRole } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  

  if (isLoading) return <div className="p-4 text-sm text-slate-500">Chargement des utilisateurs...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Gestion des utilisateurs</h1>
        <p className="text-[11px] text-slate-400">Administrez les privilèges des membres inscrits.</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
        <table className="min-w-full text-left text-xs">
          <thead className="bg-slate-50/60 border-b border-slate-100 text-slate-500 font-bold uppercase">
            <tr>
              <th className="px-4 py-3">Utilisateur</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Rôle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/30 transition-colors">
                <td className="px-4 py-3 font-medium text-slate-900">{user.name || "Sans nom"}</td>
                <td className="px-4 py-3 text-slate-500">{user.email}</td>
                <td className="px-4 py-3">
                  <select
                    defaultValue={user.role}
                    // On empêche le changement si c'est l'admin lui-même (précaution)
                    onChange={(e) => updateRole(user.id, e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 outline-none focus:border-orange-500 cursor-pointer font-bold text-slate-700"
                  >
                    <option value="CLIENT">CLIENT</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
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