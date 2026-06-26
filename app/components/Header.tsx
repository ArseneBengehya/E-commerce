"use client";

import { AppName } from "../utils";
import { useRouter } from "next/navigation";
import { useDisclosure,useMounted } from "@mantine/hooks";
import { Input } from "@mantine/core";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { MdChevronRight, MdFavoriteBorder } from "react-icons/md";
import Link from "next/link";
// import ThemeSwitcher from "./ThemeSwitcher";
import { usePathname } from "next/navigation";
import { useCartStore } from "../store/useCartStore";
import { useEffect, useState } from "react";

const Header = () => {
  const router = useRouter();
  const [opened, { close, open }] = useDisclosure(false);
  const [isCartOpen, { open: openCart, close: closeCart }] =
    useDisclosure(false);

  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/auth";
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  // RÉCUPÉRATION DU COMPTEUR DE PANIER
  const { getCartCount } = useCartStore();
const isMounted = useMounted();

  const navigation = [
    {
      title: "Accueil",
      link: "/",
      show: true,
    },
    {
      title: "Shop",
      link: "/shop",
      show: true,
    },
    {
      title: "Mon compte",
      link: "/account",
      show: true,
    },
    {
      title: "Connexion",
      link: "/auth",
      show: true,
    },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between px-20">
        {/* name and navigations */}
        <div className="flex justify-between items-center gap-5">
          <h2 className="font-black text-lg tracking-tight cursor-pointer" onClick={() => router.push("/")}>
            {AppName}
          </h2>
          <div className="flex items-center gap-3">
            {navigation.map((item) => (
              <Link
                key={item.title}
                href={item.link}
                className={`font-bold text-xs ${pathname === item.link ? "text-primary" : "text-foreground"}`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        {/* search, cart and favorite */}
        <div className="flex items-center justify-end gap-4 flex-1">
          {/* SEARCH CONTAINER (60% de l'espace alloué aux actions) */}
          <div className="relative w-[60%]">
            <Input
              variant="outline"
              placeholder="Recherche..."
              size="xs"
              className="w-full h-8 text-xs border border-gray-300 rounded-md"
            />
            <CiSearch
              size={16}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
            />
          </div>

          {/* ICON CART AVEC BADGE DYNAMIQUE */}
          <button
            className="p-1 hover:text-primary transition-colors cursor-pointer relative"
            onClick={() => {
              router.push("/cart");
            }}
          >
            <CiShoppingCart size={20} />
            {isMounted && getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white font-black text-[9px] h-4 w-4 rounded-full flex items-center justify-center animate-scaleIn shadow-2xs">
                {getCartCount()}
              </span>
            )}
          </button>

          {/* ICON FAVORIS */}
          <button
            className="p-1 hover:text-primary transition-colors cursor-pointer"
            onClick={() => {
              router.push("/favorite");
            }}
          >
            <MdFavoriteBorder size={18} />
          </button>
        </div>
      </div>

      {!isHome && (
        <div className="bg-white py-3 px-20 mt-2">
          <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-[10px] font-semibold text-muted tracking-wide uppercase">
            <Link href="/" className="hover:text-primary transition-colors">
              Accueil
            </Link>

            {pathSegments.map((segment, index) => {
              const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
              const isLast = index === pathSegments.length - 1;
              const segmentName = decodeURIComponent(segment).replace(
                /-/g,
                " ",
              );

              return (
                <div key={href} className="flex items-center gap-1.5">
                  <MdChevronRight size={12} className="text-zinc-400" />
                  {isLast ? (
                    <span className="text-foreground font-bold truncate max-w-[120px]">
                      {segmentName}
                    </span>
                  ) : (
                    <Link
                      href={href}
                      className="hover:text-primary transition-colors"
                    >
                      {segmentName}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;