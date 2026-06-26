"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const AuthPage = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm border border-gray-200 rounded-sm p-8 bg-white shadow-sm">
        
        {/* EN-TÊTE */}
        <div className="text-center mb-8">
          <h2 className="text-xs font-black uppercase tracking-widest text-gray-900">
            Connexion
          </h2>
          <p className="text-[11px] text-gray-500 mt-2">
            Connectez-vous pour accéder à votre espace, vos commandes et vos favoris.
          </p>
        </div>

        {/* BOUTON GOOGLE */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/account" })}
          className="w-full flex items-center justify-center gap-3 h-10 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors group"
        >
          <FcGoogle size={18} />
          <span className="text-xs font-bold text-gray-700">Continuer avec Google</span>
        </button>

        {/* LIGNE DE SÉPARATION */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold text-gray-400">
            <span className="bg-white px-2">ou</span>
          </div>
        </div>

        {/* TEXTE LÉGAL */}
        <p className="text-[10px] text-center text-gray-400 leading-relaxed">
          En continuant, vous acceptez nos{" "}
          <span className="underline cursor-pointer hover:text-gray-900">
            conditions d'utilisation
          </span>{" "}
          et notre{" "}
          <span className="underline cursor-pointer hover:text-gray-900">
            politique de confidentialité
          </span>.
        </p>
      </div>
    </div>
  );
};

export default AuthPage;