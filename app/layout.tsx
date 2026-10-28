import type { Metadata } from "next";
import "./globals.css";
import { AdminProvider } from "@/context/AdminContext";
import AdminShell from "@/components/AdminShell";

export const metadata: Metadata = {
  title: "Tunix-Bot | Mission Control & Admin Dashboard",
  description: "Advanced management dashboard for Tunix-Bot AI companion e-commerce store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#080c14] text-slate-100">
        <AdminProvider>
          <AdminShell>{children}</AdminShell>
        </AdminProvider>
      </body>
    </html>
  );
}
