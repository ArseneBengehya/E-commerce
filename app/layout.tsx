"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// On importe ColorSchemeScript pour éviter les flashs de couleurs
import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import { AppName } from "./utils";
import { ContextProvider } from "./context";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: AppName,
//   description: "Plateforme moderne de commerce et logistique Goma - Bukavu",
// };

// Configuration optionnelle du thème Mantine pour s'aligner sur tes choix
const theme = createTheme({
  primaryColor: "blue",
  defaultRadius: "sm",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      /* On ajoute 'dark' ou 'light' ici. Grâce à ton globals.css, tout ton site va s'adapter */
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased w-full overflow-hidden`}
    >
      <head>
        {/* Ce script Mantine doit impérativement être avant le <body> */}
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>

      {/* Ton body profite maintenant des transitions fluides configurées dans globals.css */}
      <body className="w-full h-full flex flex-col overflow-hidden text-foreground bg-background">
        <SessionProvider>
          <MantineProvider theme={theme} defaultColorScheme="dark">
            <ToastContainer />
            <ContextProvider>{children}</ContextProvider>
          </MantineProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
