import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/layout/main-nav";
import { UserNav } from "@/components/layout/user-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inventario MiniMarket",
  description: "Sistema para gestior inventario de cualquier sitio que venda productos",
  authors: [{name: "Heymer Dev", url: "https://heymerdev.netlify.app"}]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-stone-950`}>
        <header className="sticky top-0 z-40 border-b flex justify-center bg-black text-secondary">
          <div className="container flex h-16 items-center justify-between py-4">
            <MainNav />
            <UserNav />
          </div>
        </header>
        <main className="px-40">{children}</main>
      </body>
    </html>
  );
}
