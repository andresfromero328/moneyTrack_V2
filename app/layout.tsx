import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "moneyTrack",
  description: "Financial aid application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexend.variable} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
