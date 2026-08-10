import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TrackingScripts } from "@/components/tracking-scripts";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Zumbido na Prática",
  description: "Formação prática em tratamento de zumbido para profissionais da saúde.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans antialiased">
        <TrackingScripts />
        {children}
      </body>
    </html>
  );
}
