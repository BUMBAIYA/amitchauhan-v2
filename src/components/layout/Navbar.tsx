import { usePathname } from "next/navigation";
import Link from "next/link";
import { classNames } from "../utility/classNames";
import { AnimatedLogo } from "../animation/AnimatedLogo";
import MobileNavbar from "./MobileNavbar";
import { AnimatePresence } from "framer-motion";

export type tabLink = { name: string; href: string };

export const LINKS: tabLink[] = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "#" },
  { name: "Blog", href: "#" },
  { name: "About", href: "#" },
];

type NavbarProps = {
  pages: tabLink[];
};

export default function Navbar(props: NavbarProps) {
  const pathName = usePathname();
  return (
    <header className="sticky top-0 px-6 py-8 sm:px-8 md:px-16">
      <div className="mx-auto flex max-w-5xl justify-between">
        <Link
          href="/"
          className="flex items-center justify-center"
          aria-label="Return to home page"
        >
          <div className="h-12 w-12 sm:h-16 sm:w-16">
            <AnimatedLogo />
          </div>
        </Link>
        <div className="hidden gap-2 rounded-full px-2 py-2 shadow-md ring-1 ring-zinc-200 backdrop-blur-md md:flex">
          <ul className="flex gap-2 text-sm font-medium">
            {props.pages.map((_link, index) => {
              return (
                <li
                  key={index}
                  className="my-3 transition-transform duration-100 hover:scale-[1.1]"
                >
                  <Link
                    href={_link.href}
                    className={classNames(
                      pathName === _link.href
                        ? "bg-tera-500 text-white hover:bg-tera-500/80"
                        : "hover:text-tera-500",
                      "mx-3 rounded-full px-3 py-2 transition-colors duration-100",
                    )}
                  >
                    {_link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <AnimatePresence>
          <MobileNavbar />
        </AnimatePresence>
      </div>
    </header>
  );
}
