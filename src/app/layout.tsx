import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cozinhamaisconsciente.com.br"),
  title: {
    default: "Cozinha Mais Consciente — Saúde, Alimentação e Utensílios Seguros",
    template: "%s | Cozinha Mais Consciente",
  },
  description:
    "Portal independente dedicado a levar informação de qualidade sobre saúde, alimentação e cozinha consciente para famílias brasileiras.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://cozinhamaisconsciente.com.br",
    siteName: "Cozinha Mais Consciente",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Cozinha Mais Consciente",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

import CookieBanner from "@/components/CookieBanner";
import FloatingCTA from "@/components/FloatingCTA";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <FloatingCTA />
        <CookieBanner />
      </body>
    </html>
  );
}
