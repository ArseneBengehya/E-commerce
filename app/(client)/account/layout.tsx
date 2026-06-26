"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CiLogout, CiShoppingCart } from "react-icons/ci";
import { FaCircleUser } from "react-icons/fa6";
import { HiShieldCheck } from "react-icons/hi2";
import { FcHome } from "react-icons/fc";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  const navigations = [
    {
      title: "Dashboard",
      link: "/account",
      icon: <FcHome size={16} />,
    },
    {
      title: "Commandes",
      link: "/account/orders",
      icon: <CiShoppingCart size={16} />,
    },
    {
      title: "Profile",
      link: "/account/profil",
      icon: <FaCircleUser size={15} />,
    },
    {
      title: "Securite",
      link: "/account/credentials",
      icon: <HiShieldCheck size={16} />,
    },
  ];

  const pathname = usePathname();
  const currentNav = navigations.find((item) => pathname === item.link);
  const pageTitle = currentNav ? currentNav.title : "Mon compte";

  return (
    <div className="px-20 mt-5 flex justify-between gap-3">
      {/* sidebar - w-64 pour une largeur fixe et propre */}
      <div className="w-64 border border-gray-200 h-auto p-1.5 flex flex-col justify-between shrink-0">
        <div className="space-y-0.5">
          {navigations.map((item) => {
            const isActive = pathname === item.link;
            return (
              <Link
                key={item.link}
                href={item.link}
                className={`w-full flex items-center gap-3 py-1.5 px-2.5 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                  isActive
                    ? "text-primary bg-gray-50"
                    : "text-gray-600 hover:text-gray-950 hover:bg-gray-50/50"
                }`}
              >
                <span className="flex items-center justify-center shrink-0">{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>

        {/* Bouton de déconnexion aligné avec le style des liens */}
        <button className="w-full flex items-center gap-3 py-1.5 px-2.5 mt-2 text-xs font-bold text-red-600 hover:bg-red-50/60 rounded-md transition-colors cursor-pointer text-left border-t border-gray-100 pt-2">
          <span className="flex items-center justify-center shrink-0"><CiLogout size={16} /></span>
          <span>Se deconnecter</span>
        </button>
      </div>

      {/* main */}
      <div className="w-full h-auto border border-gray-200">
        {/* header */}
        <h2 className="bg-white py-2 px-3 font-bold border-b border-gray-100 text-xs text-gray-900 uppercase tracking-wide">
          {pageTitle}
        </h2>
        <div className="p-3">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;