import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { Provider } from "jotai";

import "./globals.scss";
import { LoadingProvider } from "@/entities/loading";

const cg = Cormorant_Garamond({
  variable: "--font-cg",
  subsets: ["cyrillic"],
  weight: "400",
});

const cgItalic = Cormorant_Garamond({
  variable: "--font-cg-italic",
  subsets: ["cyrillic"],
  style: "italic",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Руслан и Алина",
  description: "Приглашение на свадьбу",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${cg.variable} ${cgItalic.variable}`}>
        <Provider>
          <LoadingProvider>{children}</LoadingProvider>
        </Provider>
      </body>
    </html>
  );
}
