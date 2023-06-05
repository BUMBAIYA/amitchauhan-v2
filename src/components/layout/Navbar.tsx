import { usePathname } from "next/navigation";
import Link from "next/link";
import { classNames } from "../utility/classNames";

type tabLink = { name: string; href: string };

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
          <svg
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 fill-teal-600 md:w-12"
          >
            <path d="M3.78711 3.17969L5 0.841797L9.74609 10H7.22656L3.78711 3.17969ZM4.6543 6.29688L2.77344 10H0.253906L3.42969 3.87109L4.6543 6.29688Z" />
          </svg>
        </Link>
        <div className="flex gap-2 rounded-full px-2 py-2 shadow-md ring-1 ring-zinc-200 backdrop-blur-md">
          <ul className="hidden gap-2 text-sm font-medium md:flex">
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
          <button className="mx-3 flex items-center gap-1 py-1 font-semibold md:hidden">
            Menu
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="100%"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
