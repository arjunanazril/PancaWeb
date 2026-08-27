import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeScript } from "@/components/theme/theme-script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pancaruang.vercel.app"),
  title: {
    default: "PancaRuang - Pancasila dalam Kehidupan",
    template: "%s | PancaRuang",
  },
  description:
    "Mengenal, memahami, dan melihat penerapan nilai-nilai Pancasila dalam kehidupan sehari-hari.",
  openGraph: {
    title: "PancaRuang - Pancasila dalam Kehidupan",
    description:
      "Digital Living Gallery of Pancasila untuk belajar nilai Pancasila lewat dokumentasi nyata.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full bg-background text-foreground">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
