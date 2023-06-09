import type { AppProps } from "next/app";
import MainLayout from "@/components/layout/MainLayout";
import { AnimatePresence } from "framer-motion";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <AnimatePresence mode="wait" initial={false}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </AnimatePresence>
    </ThemeProvider>
  );
}
