"use client";

import { AppName } from "../utils";
import { useRouter, usePathname } from "next/navigation";
import { useMounted } from "@mantine/hooks";
import { Input, Popover, Button, Text, Stack } from "@mantine/core";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { MdChevronRight, MdFavoriteBorder } from "react-icons/md";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useCartStore } from "../store/useCartStore";
import { useAuthStore } from "../store/useAuthStore";

const Header = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isMounted] = [useMounted()];
  const { getCartCount } = useCartStore();
  const pathname = usePathname();
  const { isAuthPopoverOpen, closeAuthPopover } = useAuthStore();

  const isHome = pathname === "/" || pathname === "/auth";
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  const navigation = [
    { title: "Accueil", link: "/" },
    { title: "Shop", link: "/shop" },
    { title: "Mon compte", link: "/account" },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between px-20 py-4">
        <div className="flex justify-between items-center gap-5">
          <h2
            className="font-black text-lg tracking-tight cursor-pointer"
            onClick={() => router.push("/")}
          >
            {AppName}
          </h2>
          <div className="flex items-center gap-5">
            {navigation.map((item) => (
              <Link
                key={item.title}
                href={item.link}
                className={`font-bold text-xs ${pathname === item.link ? "text-primary" : "text-foreground"}`}
              >
                {item.title}
              </Link>
            ))}

            {/* COMPOSANT AUTH POPOVER */}
            <Popover width={180} position="bottom-end" withArrow shadow="md">
              <Popover.Target>
                <div className="cursor-pointer">
                  {!session?.user && (
                    <span className="font-bold text-xs hover:text-primary">
                      Connexion
                    </span>
                  )}
                </div>
              </Popover.Target>
              <Popover.Dropdown className="!bg-white">
                {session?.user ? (
                  <Stack gap="xs">
                    <Text size="xs" truncate>
                      Salut, <b>{session.user.name}</b>
                    </Text>
                    <Button
                      color="red"
                      size="xs"
                      variant="outline"
                      onClick={() => signOut()}
                    >
                      Déconnexion
                    </Button>
                  </Stack>
                ) : (
                  <Stack gap="xs">
                    <Text size="xs">Accès compte</Text>
                    <Button
                      size="xs"
                      className="!bg-primary"
                      onClick={() => signIn("google")}
                    >
                      Google Login
                    </Button>
                  </Stack>
                )}
              </Popover.Dropdown>
            </Popover>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 flex-1">
          <div className="relative w-[60%]">
            <Input
              variant="outline"
              placeholder="Recherche..."
              size="xs"
              className="w-full h-8 text-xs bg-white !text-black"
            />

            <CiSearch
              size={16}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted"
            />
          </div>

          <button
            className="p-1 hover:text-primary relative"
            onClick={() => router.push("/cart")}
          >
            <CiShoppingCart size={20} />
            {isMounted && getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white font-black text-[9px] h-4 w-4 rounded-full flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </button>
          <button
            className="p-1 hover:text-primary"
            onClick={() => router.push("/favorite")}
          >
            <MdFavoriteBorder size={18} />
          </button>
        </div>
      </div>
      {!isHome && (
        <div className="bg-white py-3 px-20 mt-2">
          <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-[10px] font-semibold text-muted tracking-wide uppercase">
            <Link href="/" className="hover:text-primary">
              Accueil
            </Link>

            {pathSegments.map((segment, index) => {
              const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
              const isLast = index === pathSegments.length - 1;
              return (
                <div key={href} className="flex items-center gap-1.5">
                  <MdChevronRight size={12} className="text-zinc-400" />

                  {isLast ? (
                    <span className="text-foreground font-bold">
                      {decodeURIComponent(segment)}
                    </span>
                  ) : (
                    <Link href={href}>{decodeURIComponent(segment)}</Link>
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
