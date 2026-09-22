import { Geist, Geist_Mono } from "next/font/google";
import FloatingWhatsApp from "./components/floating-whatsapp";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Cauã | Soluções digitais para negócios",
  description: "Desenvolvimento web, automação e dados para transformar ideias e problemas de negócio em soluções digitais.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}<FloatingWhatsApp /></body>
    </html>
  );
}
