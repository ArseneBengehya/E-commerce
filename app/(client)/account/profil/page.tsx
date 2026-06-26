"use client";

import React, { useState } from "react";
import { CiUser, CiMail } from "react-icons/ci";

const ProfilPage = () => {
  // États locaux pour gérer les champs éditables
  const [username, setUsername] = useState("Portace Pc");
  const [email, setEmail] = useState("portace.pc@example.com");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    // Simulation d'une mise à jour de profil via API
    setTimeout(() => {
      setIsSubmitting(false);
      setMessage({
        type: "success",
        text: "Profil mis à jour avec succès !",
      });
    }, 1200);
  };

  return (
    <div className="space-y-4 max-w-xl">
      <div>
        <h1 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
          Informations du profil
        </h1>
        <p className="text-[11px] text-slate-400">
          Gérez vos informations d'identification publiques. Seuls le nom d'utilisateur et l'adresse e-mail peuvent être modifiés.
        </p>
      </div>

      {/* Message de notification d'état */}
      {message && (
        <div
          className={`p-2.5 rounded-lg text-xs font-semibold ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-100"
              : "bg-rose-50 text-rose-800 border border-rose-100"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* FORMULAIRE DE MISE À JOUR */}
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        
        {/* Champ Nom d'utilisateur */}
        <div className="space-y-1">
          <label className="font-bold text-slate-700 block">Nom d'utilisateur</label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-slate-400">
              <CiUser size={16} />
            </span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ex: Portace Pc"
              required
              className="w-full h-9 rounded-lg border border-slate-200 pl-9 pr-3 outline-none transition focus:border-primary text-slate-800 font-medium"
            />
          </div>
        </div>

        {/* Champ Adresse Email */}
        <div className="space-y-1">
          <label className="font-bold text-slate-700 block">Adresse e-mail</label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-slate-400">
              <CiMail size={16} />
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex: exemple@mail.com"
              required
              className="w-full h-9 rounded-lg border border-slate-200 pl-9 pr-3 outline-none transition focus:border-primary text-slate-800 font-medium"
            />
          </div>
        </div>

        {/* Bouton de soumission */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-9 px-5 rounded-lg bg-slate-900 font-bold text-white hover:bg-slate-800 disabled:bg-slate-300 transition-colors cursor-pointer inline-flex items-center justify-center min-w-[140px]"
          >
            {isSubmitting ? (
              <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              "Enregistrer"
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default ProfilPage;