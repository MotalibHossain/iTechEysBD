import type { Metadata } from "next";
import { Geist_Mono, Hanken_Grotesk, Newsreader } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "iTechEysbd",
  description: "Technology, Programming, and Development Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${newsreader.variable} ${geistMono.variable} h-full antialiased`}
    >
      <Header />
      <div className="container mx-auto">
        <body className="min-h-full flex flex-col font-sans">
          {children}
        </body>
      </div>
      <Footer />
    </html>
  );
}
