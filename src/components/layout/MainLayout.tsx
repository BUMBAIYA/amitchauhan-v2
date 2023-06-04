import { ReactNode } from "react";
import { Open_Sans } from "next/font/google";
import { classNames } from "../utility/classNames";
import Navbar, { LINKS } from "./Navbar";

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
        <header className="sticky top-0 flex items-center justify-end px-8 py-8">
          <Navbar pages={LINKS} />
        </header>
        <main
          className={classNames(
            "px-6 py-16 sm:p-8 md:px-16 md:py-20",
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
