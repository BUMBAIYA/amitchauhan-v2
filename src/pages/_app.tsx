import type { AppProps } from "next/app";
import MainLayout from "@/components/layout/MainLayout";
import { AnimatePresence } from "framer-motion";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </AnimatePresence>
  );
}
