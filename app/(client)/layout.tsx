import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />

      <div className="flex-1 overflow-y-auto w-full flex flex-col">
        <main className="flex-1 w-full">
          {children}
        </main>

        {/* <Footer /> */}
      </div>
    </>
  );
}
