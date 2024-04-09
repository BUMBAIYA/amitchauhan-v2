import { Fragment, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

import { AnimatePresence, motion } from "framer-motion";
import { Dialog, Transition } from "@headlessui/react";

import MenuLogo from "@/layout/navbar/menu-button";
import ThemeSwitch from "@/layout/navbar/theme-switch";
import AnimatedLogo from "@/animation/animated-logo";
import { classNames } from "@/utility/classNames";

export type NavbarRoute = {
  title: string;
  href: string;
};

export type NavbarRoutes = NavbarRoute[];

export interface NavbarProps {
  routes: NavbarRoutes;
}

export default function Navbar(props: NavbarProps) {
  const pathName = usePathname();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleClick = (href: string) => {
    toggleModal();
    router.push(href);
  };

  return (
    <header className="sticky top-0 z-50 mt-2 px-6 py-8 sm:mt-8 sm:px-14 md:px-20">
      <div className="mx-auto flex items-center justify-between lg:max-w-7xl">
        <Link
          href="/"
          className="drop-shadow-teralight flex items-center justify-center"
          aria-label="Return to home page"
        >
          <div className="relative h-12 w-12 sm:h-14 sm:w-14">
            <AnimatedLogo />
          </div>
        </Link>
        <nav className="hidden items-center gap-2 rounded-full px-2 py-2 shadow-md ring-1 ring-zinc-200 backdrop-blur-md dark:ring-accent/50 md:flex">
          <ul className="flex gap-2 text-sm font-medium">
            {props.routes.map((_link, index) => {
              return (
                <li
                  key={index}
                  className="my-3 transition-transform duration-100 hover:scale-[1.1]"
                >
                  <Link
                    href={_link.href}
                    className={classNames(
                      pathName === _link.href
                        ? "font-semibold text-background dark:hover:text-foreground"
                        : "text-foreground",
                      "group relative mx-3 rounded-full px-3 py-2 transition-colors duration-200",
                    )}
                  >
                    {_link.href === pathName && (
                      <motion.span
                        layoutId="tab-pill"
                        animate={{
                          transition: {
                            x: {
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            },
                          },
                        }}
                        className="absolute inset-0 -z-10 rounded-full bg-accent group-hover:bg-accent/80"
                      ></motion.span>
                    )}
                    {_link.title}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ThemeSwitch />
        </nav>
        <AnimatePresence>
          <MenuLogo open={isModalOpen} toggle={toggleModal} />
        </AnimatePresence>
      </div>

      <Transition show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="z-50" onClose={setIsModalOpen}>
          <div className="fixed inset-0 flex items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 bottom-full"
              enterTo="opacity-100 bottom-[15%]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 bottom-[15%]"
              leaveTo="opacity-0 bottom-full"
            >
              <Dialog.Panel className="pointer-events-none absolute flex min-h-[85%] w-full flex-col items-center justify-center overflow-y-auto rounded-b-2xl border-2 border-accent/20 bg-background px-6 py-8 text-accent shadow-lg shadow-accent/10 md:px-10 md:py-16">
                <div className="pointer-events-auto flex flex-col items-center gap-6 text-center">
                  {props.routes.map((link, i) => (
                    <button
                      key={i}
                      className="group relative py-2 text-3xl font-medium"
                      onClick={() => handleClick(link.href)}
                    >
                      <span
                        className={classNames(
                          pathName === link.href ? "w-full" : "w-0",
                          "absolute -bottom-1 left-0 h-1 rounded-lg bg-accent transition-[width] duration-300 group-hover:w-full",
                        )}
                      ></span>
                      {link.title}
                    </button>
                  ))}
                  <ThemeSwitch setClose={setIsModalOpen} />
                </div>
                <div className="absolute bottom-0 py-6">©2023 Amit Chauhan</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </header>
  );
}
