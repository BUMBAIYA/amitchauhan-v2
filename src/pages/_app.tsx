import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { AnimatePresence } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import "@/styles/globals.css";

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
