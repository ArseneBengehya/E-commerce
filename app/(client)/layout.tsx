import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
return (
  <div className="w-full h-screen flex flex-col overflow-hidden py-2">
    {/* Le Header prend sa hauteur naturelle */}
    <Header />

    {/* Ce conteneur prend TOUT l'espace restant et gère le scroll proprement */}
    <div className="flex-1 overflow-y-auto w-full flex flex-col bg-background">
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* <Footer /> */}
      <Footer/>
    </div>
  </div>
);
}
