"use client";

import { useMantineColorScheme, ActionIcon, Text, Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { CiLight, CiSun } from "react-icons/ci";
import { MdNightlight } from "react-icons/md";

export default function ThemeSwitcher() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [mounted, setMounted] = useState(false);

  // Évite les erreurs de désynchronisation (hydration mismatch) au chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />; // Un carré vide le temps du chargement
  }

  const isDark = colorScheme === "dark";

  const toggleTheme = () => {
    const nextScheme = isDark ? "light" : "dark";
    setColorScheme(nextScheme);

    // Sécurité supplémentaire pour s'assurer que Tailwind v4 capte le changement immédiatement
    if (nextScheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="items-start text-left rounded-sm hover:bg-gray-100 dark:hover:bg-gray-300 text-sm py-1 px-1"
    >
      {isDark ? (
        <div className="flex items-center gap-2">
          <CiLight
            size={22}
            className="text-amber-400 transition-transform hover:rotate-45"
          />
          <Text size="sm" className="font-semibold">
            Claire
          </Text>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <MdNightlight
            size={22}
            className="text-slate-700 dark:text-slate-200 transition-transform hover:-rotate-12"
          />
          <Text size="sm" className="font-semibold">
            Sombre
          </Text>
        </div>
      )}
    </button>
  );
}
