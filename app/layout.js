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
  openGraph: {
    title: "Cauã | Soluções digitais para negócios",
    description: "Desenvolvimento web, automação e dados para transformar ideias e problemas de negócio em soluções digitais.",
    url: "https://bycauazin.web.app/",
    siteName: "Cauã | bycauazin",
    images: [
      {
        url: "https://bycauazin.web.app/foto-perfil.jpg",
        width: 1200,
        height: 630,
        alt: "Cauã | Soluções digitais",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cauã | Soluções digitais para negócios",
    description: "Desenvolvimento web, automação e dados para transformar ideias e problemas de negócio em soluções digitais.",
    images: ["https://bycauazin.web.app/foto-perfil.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/foto-perfil.jpg",
  },
};

export const metadataBase = new URL("https://bycauazin.web.app");

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}<FloatingWhatsApp /></body>
    </html>
  );
}
