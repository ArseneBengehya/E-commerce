"use client";
import React from "react";

const AuthPage = () => {
  return (
    <div className="px-20 mt-5 flex gap-8">
      
      {/* PARTIE GAUCHE : CONNEXION */}
      <div className="w-1/2 border border-gray-200 rounded-sm p-4 flex flex-col justify-between h-fit">
        <div>
          <h2 className="text-xs font-black text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-2 mb-4">
            Se connecter
          </h2>
          
          <form className="space-y-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-600">Adresse Email</label>
              <input
                type="email"
                placeholder="Ex: votreemail@gmail.com"
                className="w-full h-8 rounded-md border border-gray-200 px-2.5 text-xs outline-none transition focus:border-primary text-gray-800 font-medium"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-600">Mot de passe</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full h-8 rounded-md border border-gray-200 px-2.5 text-xs outline-none transition focus:border-primary text-gray-800 font-medium"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full h-8 mt-2 rounded-md bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Connexion
            </button>
          </form>
        </div>
      </div>

      {/* PARTIE DROITE : CRÉATION DE COMPTE */}
      <div className="w-full border border-gray-200 rounded-sm p-4 h-fit">
        <h2 className="text-xs font-black text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-2 mb-4">
          Créer un compte
        </h2>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1 sm:col-span-2">
            <label className="text-[11px] font-bold text-gray-600">Nom d'utilisateur</label>
            <input
              type="text"
              placeholder="Ex: bienfait_mb"
              className="w-full h-8 rounded-md border border-gray-200 px-2.5 text-xs outline-none transition focus:border-primary text-gray-800 font-medium"
              required
            />
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="text-[11px] font-bold text-gray-600">Adresse Email</label>
            <input
              type="email"
              placeholder="Ex: exemple@domaine.com"
              className="w-full h-8 rounded-md border border-gray-200 px-2.5 text-xs outline-none transition focus:border-primary text-gray-800 font-medium"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-600">Mot de passe</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full h-8 rounded-md border border-gray-200 px-2.5 text-xs outline-none transition focus:border-primary text-gray-800 font-medium"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-600">Confirmer mot de passe</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full h-8 rounded-md border border-gray-200 px-2.5 text-xs outline-none transition focus:border-primary text-gray-800 font-medium"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full h-8 sm:col-span-2 mt-2 rounded-md bg-primary text-white font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer"
          >
            S'inscrire
          </button>
        </form>
      </div>

    </div>
  );
};

export default AuthPage;