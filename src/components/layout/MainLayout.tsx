import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { classNames } from "../utility/classNames";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout(props: MainLayoutProps) {
  return (
    <>
      <header className="bg-teal sticky top-0 px-8 py-4">
        <div className="flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/demo">Demo</Link>
        </div>
      </header>
      <main className={classNames("min-h-screen", inter.className)}>
        {props.children}
      </main>
      <footer className="bg-teal-600 px-4 py-2 text-zinc-100">
        Amit Chauhan @2023
      </footer>
    </>
  );
}
