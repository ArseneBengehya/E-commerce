"use client";

import React from "react";
import { CiUser, CiMail, CiCalendar, CiLock } from "react-icons/ci";

const ProfilPage = ({ user }: { user?: any }) => {
  // Données mockées si aucune prop user n'est passée
  const userData = user || {
    name: "Bienfait Mbilizi",
    email: "bienfaitmbilizi65@gmail.com",
    image: "https://ui-avatars.com/api/?name=Bienfait+Mbilizi&background=random",
    createdAt: "Juin 2026",
  };

  return (
    <div className="space-y-8 max-w-lg">
      {/* HEADER AVEC PHOTO DE PROFIL */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <img
            src={userData.image}
            alt="Profil"
            className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
          />
          <div className="absolute bottom-0 right-0 h-5 w-5 bg-emerald-500 border-2 border-white rounded-full"></div>
        </div>
        <div>
          <h2 className="text-lg font-black text-slate-900">{userData.name}</h2>
          <p className="text-xs text-slate-400 font-medium">Utilisateur certifié</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Champ Nom */}
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">
            Nom complet
          </label>
          <div className="flex items-center gap-3 w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-100 text-slate-700">
            <CiUser size={20} className="text-slate-400" />
            <span className="font-medium text-sm">{userData.name}</span>
          </div>
        </div>

        {/* Champ Email */}
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">
            Adresse e-mail
          </label>
          <div className="flex items-center gap-3 w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-100 text-slate-700">
            <CiMail size={20} className="text-slate-400" />
            <span className="font-medium text-sm">{userData.email}</span>
          </div>
        </div>

        {/* Grille infos */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">
              Membre depuis
            </label>
            <div className="flex items-center gap-2 h-10 px-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-600">
              <CiCalendar size={18} />
              <span className="text-xs font-medium">{userData.createdAt}</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">
              Statut
            </label>
            <div className="flex items-center gap-2 h-10 px-3 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700">
              <CiLock size={18} />
              <span className="text-xs font-bold">Vérifié</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilPage;