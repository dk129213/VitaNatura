import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import { MotionProvider } from "@/components/Reveal";
import { LangSync } from "@/components/LangToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VitaNatura 365",
  description:
    "Aktivni i zdravstveni turizam u Dubrovačko-neretvanskoj županiji, cijele godine. Active and health tourism in the Dubrovnik region, all year round.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="hr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LangSync />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
