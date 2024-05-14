import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import "./globals.css";

import MainProviders from "./(modules)/(shared)/providers/main-providers/main-providers";
import { cn } from "../lib/utils/cn";
import LoadingRemembermeLoader from "./(modules)/(shared)/(components)/loading-sign-in-loader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Grupo Platino Expo Construye 2024",
  description: "Grupo Platino Expo Construye 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <head>
        <link id="theme-css" href={`/themes/viva-light/theme.css`} rel="stylesheet"></link>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const style = document.createElement('style')
              style.innerHTML = '@layer tailwind-base, primereact, tailwind-utilities;'
              style.setAttribute('type', 'text/css')
              document.querySelector('head').prepend(style)
            `,
          }}
        />
      </head>
      <body className={cn(inter.className, "overflow-hidden")}>
        <MainProviders>
          <LoadingRemembermeLoader />
          {children}
        </MainProviders>
      </body>
    </html>
  );
}
