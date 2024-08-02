import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";
import { AnimatePresence } from "framer-motion";

import MainLayout from "@/layout/main-layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="light">
        <MainLayout>
          <AnimatePresence mode="wait" initial={false}>
            <Component key={router.asPath} {...pageProps} />
          </AnimatePresence>
        </MainLayout>
      </ThemeProvider>
      <Analytics />
    </>
  );
}
