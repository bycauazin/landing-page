import { Geist, Geist_Mono, Major_Mono_Display } from "next/font/google";
import FloatingWhatsApp from "./components/floating-whatsapp";
import { introScript } from "./components/intro-script";
import SiteIntro from "./components/site-intro";
import { themeScript } from "./components/theme-script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Fonte da marca (BC e <bycauazin/>), escolhida em 2026-11-25.
const brandFont = Major_Mono_Display({
  variable: "--font-brand",
  weight: "400",
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
    icon: { url: "/logo-favicon.svg?v=3", type: "image/svg+xml" },
    shortcut: "/favicon.ico?v=3",
    apple: "/apple-touch-icon.png?v=2",
  },
};

export const metadataBase = new URL("https://bycauazin.web.app");

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning: o script do <head> pode trocar o data-theme antes do React hidratar.
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} ${brandFont.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body><SiteIntro />{children}<FloatingWhatsApp /></body>
    </html>
  );
}
