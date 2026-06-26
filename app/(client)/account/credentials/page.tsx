"use client";

import React, { useState } from "react";
import { CiLock } from "react-icons/ci";

const CredentialsPage = () => {
  // États pour les différents champs du mot de passe
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Sécurité de base côté client : vérification de la correspondance
    if (newPassword !== confirmPassword) {
      setMessage({
        type: "error",
        text: "Le nouveau mot de passe et sa confirmation ne correspondent pas.",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulation d'une modification de mot de passe via API
    setTimeout(() => {
      setIsSubmitting(false);
      setMessage({
        type: "success",
        text: "Votre mot de passe a été modifié avec succès !",
      });
      // Réinitialisation des champs après validation
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }, 1500);
  };

  return (
    <div className="space-y-4 max-w-xl">
      <div>
        <h1 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
          Sécurité du compte
        </h1>
        <p className="text-[11px] text-slate-400">
          Modifiez votre mot de passe pour sécuriser l'accès à votre espace utilisateur.
        </p>
      </div>

      {/* Message de retour d'état */}
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

      {/* FORMULAIRE DE MODIFICATION */}
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        
        {/* Mot de passe actuel */}
        <div className="space-y-1">
          <label className="font-bold text-slate-700 block">Mot de passe actuel</label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-slate-400">
              <CiLock size={16} />
            </span>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full h-9 rounded-lg border border-slate-200 pl-9 pr-3 outline-none transition focus:border-primary text-slate-800 font-medium"
            />
          </div>
        </div>

        {/* Nouveau mot de passe */}
        <div className="space-y-1">
          <label className="font-bold text-slate-700 block">Nouveau mot de passe</label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-slate-400">
              <CiLock size={16} />
            </span>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 8 caractères"
              required
              minLength={8}
              className="w-full h-9 rounded-lg border border-slate-200 pl-9 pr-3 outline-none transition focus:border-primary text-slate-800 font-medium"
            />
          </div>
        </div>

        {/* Confirmation du nouveau mot de passe */}
        <div className="space-y-1">
          <label className="font-bold text-slate-700 block">Confirmer le nouveau mot de passe</label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-slate-400">
              <CiLock size={16} />
            </span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full h-9 rounded-lg border border-slate-200 pl-9 pr-3 outline-none transition focus:border-primary text-slate-800 font-medium"
            />
          </div>
        </div>

        {/* Bouton de mise à jour */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-9 px-5 rounded-lg bg-slate-900 font-bold text-white hover:bg-slate-800 disabled:bg-slate-300 transition-colors cursor-pointer inline-flex items-center justify-center min-w-[150px]"
          >
            {isSubmitting ? (
              <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              "Mettre à jour"
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default CredentialsPage;