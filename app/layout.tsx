import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.scss";
import { Providers } from "@/shared/providers/Providers";
import Header from "@/shared/components/Header";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Food Client - Recipes",
  description: "Recipe application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
