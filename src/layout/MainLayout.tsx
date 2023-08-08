import { ReactNode } from "react";
import { Montserrat } from "next/font/google";
import { classNames } from "@/utility/classNames";
import Navbar from "./Navbar/Navbar";
import { routes } from "@/routes/navigationRoutes";
import Footer from "./Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
});

type MainLayoutProps = {
  children: ReactNode;
};

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
