import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { Montserrat } from "next/font/google";

import Navbar from "@/layout/navbar";
import { routes } from "@/data/navigationRoutes";
import { classNames } from "@/utility/classNames";

const montserrat = Montserrat({
  subsets: ["latin"],
});

const Footer = dynamic(() => import("@/layout/footer"), { ssr: true });

export interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout(props: MainLayoutProps) {
  return (
    <>
      <div className={classNames("min-h-screen", montserrat.className)}>
        <Navbar routes={routes} />
        <main>{props.children}</main>
      </div>
      <Footer />
    </>
  );
}
