import { ReactNode } from "react";
import { Open_Sans } from "next/font/google";
import { classNames } from "../utility/classNames";
import Navbar, { LINKS } from "./Navbar";
import Link from "next/link";
import Image from "next/image";

const openSans = Open_Sans({
  subsets: ["latin"],
});

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout(props: MainLayoutProps) {
  return (
    <>
      <div className={classNames("min-h-screen", openSans.className)}>
        <Navbar pages={LINKS} />
        <main
          className={classNames(
            "px-6 pt-20 sm:px-8 sm:py-24 md:px-16",
            openSans.className,
          )}
        >
          {props.children}
        </main>
      </div>
      <footer className="bg-tera-500 px-4 py-2 text-zinc-100">
        Amit Chauhan @2023
      </footer>
    </>
  );
}
