import type {Metadata} from "next";

import Link from "next/link";

import "./globals.css";

export const metadata: Metadata = {
  title: "Generador de Cupones",
  description: "Generated by colidevs CLI",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      {/* no usar colores fuera de la paleta de tailwind a menos que definas una paleta, trata de conseguir el mismo color con tailwind o agregalo como variable en tailwind.config.ts */}
      <body className="bg-[#D3D9E9] bg-slate-200 antialiased">
        <div className="container grid min-h-screen w-full grid-rows-[auto,1fr,auto]">
          <div className="border-b border-e border-s border-slate-900/30">
            <header className="leading-[4rem]">
              <h1 className="py-4 text-center text-4xl font-bold">Cupones de Descuento</h1>
            </header>
          </div>
          <main className="border-e border-s border-slate-900/30">{children}</main>
          <div className="border-e border-s border-t border-slate-900/30">
            <footer className="text-center leading-[4rem] opacity-70">
              © {new Date().getFullYear()} Generador de Cupones
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
