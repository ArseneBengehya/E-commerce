"use client";
import { AppName } from "../utils";
import { Button, Divider, Input, Popover, Text } from "@mantine/core";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { IoMdPerson } from "react-icons/io";
import { MdFavoriteBorder } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import emptyCart from "../../public/4555971.png";
import Image from "next/image";
import ThemeSwitcher from "./ThemeSwitcher";

const Header = () => {
  const router = useRouter();
  const [opened, { close, open }] = useDisclosure(false);
  const [isCartOpen, { open: openCart, close: closeCart }] =
    useDisclosure(false);
  return (
    <div className="flex items-center justify-between gap-4 bg-header text-foreground p-3 w-full">
      {/* APP NAME */}
      <h2>{AppName}</h2>

      {/* SEARCH */}
      <div className="flex-1 mx-4 relative">
        <Input placeholder="Search everything..." />
        <button className="absolute right-0 top-0 mt-2 mr-4 cursor-pointer">
          <CiSearch size={24} />
        </button>
      </div>

      <div className="flex justify-between items-center gap-3">
        <button
          className="group relative flex items-center justify-center cursor-pointer"
          onClick={() => router.push("/favorite")}
        >
          <MdFavoriteBorder
            size={20}
            className="text-foreground group-hover:text-primary transition-colors"
          />
          <span className="absolute top-full mt-2 scale-0 group-hover:scale-100 transition-all duration-200 origin-top bg-black/80 backdrop-blur-md text-white text-xs px-2 py-1 rounded shadow-md whitespace-nowrap z-50">
            Favoris
          </span>
        </button>

        <Popover
          width={350}
          position="bottom"
          withArrow
          shadow="md"
          opened={isCartOpen}
        >
          <Popover.Target>
            <button
              onMouseEnter={openCart}
              onMouseLeave={closeCart}
              className="cursor-pointer"
            >
              <CiShoppingCart
                size={20}
                className="text-foreground group-hover:text-primary transition-colors"
              />
            </button>
          </Popover.Target>

          <Popover.Dropdown onMouseEnter={openCart} onMouseLeave={closeCart}>
            <Text fw={600} size="sm">
              Panier
            </Text>
            <div className="flex flex-col items-center justify-center p-4">
              <Image
                src={emptyCart}
                alt="Empty cart illustration"
                className="w-30 h-30 text-center"
              />
              <Text size="sm" className="text-center mt-2">
                Votre panier est vide
              </Text>
              <Button
                className="mt-4 w-full"
                variant="outline"
                color="blue"
                onClick={() => router.push("/cart")}
                fullWidth
              >
                Voir le panier
              </Button>
            </div>
          </Popover.Dropdown>
        </Popover>

        <Popover
          width={200}
          position="bottom"
          withArrow
          shadow="md"
          opened={opened}
        >
          <Popover.Target>
            <button
              onMouseEnter={open}
              onMouseLeave={close}
              className="cursor-pointer"
            >
              <FaUserCircle
                size={20}
                className="text-foreground group-hover:text-primary transition-colors"
              />
            </button>
          </Popover.Target>

          <Popover.Dropdown onMouseEnter={open} onMouseLeave={close}>
            <Text fw={600} size="sm">
              Bonjour Portace
            </Text>

            <Divider />

            <div className="flex flex-col gap-2 mt-1">
              <button className="text-left rounded-sm hover:bg-gray-100 dark:hover:bg-gray-300 text-sm py-1 px-1">
                <Text size="sm">Mon compte</Text>{" "}
              </button>

              <button className="text-left rounded-sm hover:bg-gray-100 dark:hover:bg-gray-300 text-sm py-1 px-1">
                <Text size="sm">Mes commandes</Text>
              </button>
              <ThemeSwitcher />
              <Divider />
              <button className="text-left rounded-sm hover:bg-gray-100 dark:hover:bg-gray-300 text-sm text-red-500 py-1 px-1">
                Déconnexion
              </button>
            </div>
          </Popover.Dropdown>
        </Popover>
      </div>

      <button className="flex items-center gap-2 bg-zinc-900 text-white px-3 py-2 rounded-md hover:bg-zinc-800 transition-colors">
        <IoMdPerson size={20} />
        <p className="text-sm">Se connecter</p>
      </button>
    </div>
  );
};

export default Header;
