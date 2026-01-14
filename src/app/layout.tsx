import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Provider from "@/components/Provider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "StreamVibe | Eng yaxshi filmlar platformasi",
  description: "TMDB orqali eng so'nggi va ommabop filmlarni tomosha qiling",
  icons: {
    icon: "/images/Logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <Header />
        <Provider>{children}</Provider>
        <Footer />
      </body>
    </html>
  );
}
