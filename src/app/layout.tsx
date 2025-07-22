import type { Metadata } from "next";
import { Provider } from "jotai";
import { Cormorant_Garamond } from "next/font/google";
import { LoadingProvider } from "@/entities/loading";
import { ScreenHeightProvider } from "@/features/screen-height";

import "./globals.scss";

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
          <ScreenHeightProvider>
            <LoadingProvider>{children}</LoadingProvider>
          </ScreenHeightProvider>
        </Provider>
      </body>
    </html>
  );
}
