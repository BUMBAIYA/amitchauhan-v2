import { ReactNode } from "react";
import { Montserrat } from "next/font/google";
import { classNames } from "../utility/classNames";
import Navbar from "./Navbar/Navbar";
import { routes } from "../routes/navigationRoutes";

const montserrat = Montserrat({
  subsets: ["latin"],
});

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout(props: MainLayoutProps) {
  return (
    <>
      <div
        className={classNames(
          "min-h-screen px-6 sm:px-14 md:px-20",
          montserrat.className,
        )}
      >
        <Navbar routes={routes} />
        <main className="pb-32">{props.children}</main>
      </div>
    </>
  );
}
