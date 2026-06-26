"use client";
import { AppName } from "../utils";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";
import { useProductStore } from "../store/useProductStore";
import { useRouter } from "next/navigation";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { categories, fetchCategories } = useProductStore();
  const randomCategories = useMemo(() => {
    if (categories.length === 0) return [];
    const shuffled = [...categories].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  }, [categories]);

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [fetchCategories, categories.length]);
  const router = useRouter()

  return (
    <footer className="w-full bg-zinc-950 text-zinc-400 text-[11px] border-t border-zinc-800/50">
      {/* SECTION SUPÉRIEURE : GRILLE DE LIENS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* COLONNE 1 : À PROPOS / MARQUE */}
        <div className="space-y-2">
          <h3 className="text-white font-black tracking-wider uppercase text-xs">
            {AppName}
          </h3>
          <p className="leading-relaxed text-zinc-500 max-w-[200px]">
            Votre marché moderne pour une expérience shopping premium, simple et
            rapide.
          </p>
        </div>

        {/* COLONNE 2 : BOUTIQUE */}
  <div className="space-y-2">
          <h4 className="text-zinc-200 font-bold uppercase tracking-wider text-[10px]">Boutique</h4>
          <ul className="space-y-1.5 font-medium">
            <li>
              <Link href="/shop" className="hover:text-primary transition-colors">Tous les produits</Link>
            </li>
            {randomCategories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => router.push(`/shop?id=${cat.id}`)}
                  className="hover:text-primary transition-colors text-left"
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* COLONNE 3 : COMPTE & SUPPORT */}
        <div className="space-y-2">
          <h4 className="text-zinc-200 font-bold uppercase tracking-wider text-[10px]">
            Boutique
          </h4>
          <ul className="space-y-1.5 font-medium">
            <li>
              <Link
                href="/shop"
                className="hover:text-primary transition-colors"
              >
                Tous les produits
              </Link>
            </li>
            {randomCategories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => router.push(`/shop?id=${cat.id}`)}
                  className="hover:text-primary transition-colors text-left"
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* COLONNE 4 : LÉGAL */}
        <div className="space-y-2">
          <h4 className="text-zinc-200 font-bold uppercase tracking-wider text-[10px]">
            Informations
          </h4>
          <ul className="space-y-1.5 font-medium">
            <li>
              <Link
                href="/legal"
                className="hover:text-primary transition-colors"
              >
                Mentions légales
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-primary transition-colors"
              >
                Confidentialité
              </Link>
            </li>
            <li>
              <Link
                href="/conditions"
                className="hover:text-primary transition-colors"
              >
                CGV / CGU
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* SECTION INFÉRIEURE : COPYRIGHT & PAIEMENTS */}
      <div className="border-t border-zinc-900 bg-zinc-950/80 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-500 font-medium">
          {/* Copyright */}
          <div>
            © {currentYear}{" "}
            <span className="text-zinc-300 font-bold">{AppName}</span>. Tous
            droits réservés.
          </div>

          {/* Modes de paiement factices (Parfait pour rassurer l'acheteur) */}
          <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-500">
            <span className="text-[10px] uppercase tracking-wide font-bold mr-1">
              Paiement sécurisé :
            </span>
            <FaCcVisa
              size={18}
              className="hover:text-zinc-400 transition-colors"
            />
            <FaCcMastercard
              size={18}
              className="hover:text-zinc-400 transition-colors"
            />
            <FaCcPaypal
              size={18}
              className="hover:text-zinc-400 transition-colors"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
