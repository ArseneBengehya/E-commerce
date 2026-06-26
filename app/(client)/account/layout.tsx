"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CiLogout, CiShoppingCart, CiUser } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { PiShieldCheckLight } from "react-icons/pi";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  const navigations = [
    {
      title: "Dashboard",
      link: "/account",
      icon: <GoHome size={17} />,
    },
    {
      title: "Commandes",
      link: "/account/orders",
      icon: <CiShoppingCart size={18} />,
    },
    {
      title: "Profile",
      link: "/account/profil",
      icon: <CiUser size={18} />,
    },
    {
      title: "Sécurité",
      link: "/account/credentials",
      icon: <PiShieldCheckLight size={18} />,
    },
  ];

  const pathname = usePathname();
  const currentNav = navigations.find((item) => pathname === item.link);
  const pageTitle = currentNav ? currentNav.title : "Mon compte";

  return (
    <div className="px-4 py-4 lg:px-16 mx-auto max-w-7xl bg-white flex flex-col md:flex-row gap-5 items-start">
      
      {/* SIDEBAR COMPACTE & ÉPURÉE */}
      <div className="w-full md:w-60 border border-slate-100 rounded-xl p-2 bg-white shadow-xs shrink-0">
        <div className="space-y-1">
          {navigations.map((item) => {
            const isActive = pathname === item.link;
            return (
              <Link
                key={item.link}
                href={item.link}
                className={`w-full flex items-center gap-3 py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? "text-primary bg-orange-500/5"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/70"
                }`}
              >
                <span className={`flex items-center justify-center shrink-0 ${isActive ? "text-primary" : "text-slate-400"}`}>
                  {item.icon}
                </span>
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>

        {/* Bouton de déconnexion aligné */}
        <div className="mt-2 pt-2 border-t border-slate-100">
          <button className="w-full flex items-center gap-3 py-2 px-3 text-xs font-bold text-red-500 hover:text-red-600 hover:bg-red-50/60 rounded-lg transition-all cursor-pointer text-left">
            <span className="flex items-center justify-center shrink-0">
              <CiLogout size={17} />
            </span>
            <span>Se déconnecter</span>
          </button>
        </div>
      </div>

      {/* BLOC PRINCIPAL DE CONTENU */}
      <div className="w-full border border-slate-100 rounded-xl bg-white shadow-xs overflow-hidden">
        {/* Header du bloc */}
        <div className="bg-slate-50/60 py-3 px-4 border-b border-slate-100">
          <h2 className="font-black text-slate-900 text-xs uppercase tracking-wider">
            {pageTitle}
          </h2>
        </div>
        
        {/* Contenu de la sous-page */}
        <div className="p-4">
          {children}
        </div>
      </div>

    </div>
  );
};

export default AccountLayout;