import { usePathname } from "next/navigation";
import Link from "next/link";
import { classNames } from "../../utility/classNames";
import { AnimatedLogo } from "../../animation/AnimatedLogo";
import { AnimatePresence, Variants, motion, useCycle } from "framer-motion";
import MenuLogo from "./MenuButton";
import { NavbarRoutes } from "@/components/routes/navigationRoutes";

const modalVariants: Variants = {
  close: {
    scale: 0,
    opacity: 0,
    transformOrigin: "top left",
  },
  open: {
    scale: 1,
    opacity: 1,
    translateX: "-50%",
    translateY: "-50%",
    transition: {
      duration: 0.2,
    },
  },
};

type Navbar = {
  routes: NavbarRoutes;
};

export default function Navbar(props: Navbar) {
  const [isModalOpen, toggleModal] = useCycle(false, true);
  const pathName = usePathname();
  return (
    <header className="sticky top-0 px-6 py-8 sm:px-8 md:px-16">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <Link
          href="/"
          className="flex items-center justify-center"
          aria-label="Return to home page"
        >
          <div className="h-12 w-12 sm:h-14 sm:w-14">
            <AnimatedLogo />
          </div>
        </Link>
        <nav className="hidden items-center gap-2 rounded-full px-2 py-2 shadow-md ring-1 ring-zinc-200 backdrop-blur-md md:flex">
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
                      pathName === _link.href ? "text-white " : "",
                      "group relative mx-3 rounded-full px-3 py-2 transition-colors duration-100",
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
                        className="absolute inset-0 -z-10 rounded-full bg-tera-500 group-hover:bg-tera-500/80"
                      ></motion.span>
                    )}
                    {_link.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <AnimatePresence>
          <MenuLogo open={isModalOpen} toggle={toggleModal} />
        </AnimatePresence>
      </div>
      <motion.div
        variants={modalVariants}
        animate={isModalOpen ? "open" : "close"}
        className="fixed left-1/2 top-96 z-50 flex min-w-[90vw] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-between rounded-xl bg-tera-500 py-16 backdrop-blur-md sm:min-w-[70vw] sm:py-20 md:hidden"
      >
        <nav>
          <ul className="flex flex-col gap-4 text-center">
            {props.routes.map((link, i) => (
              <li key={i} className="py-2 text-3xl font-medium text-white">
                <Link href={link.href} className="group relative">
                  {link.title}
                  <span
                    className={classNames(
                      pathName === link.href ? "w-full" : "w-0",
                      "absolute -bottom-1 left-0 h-1 bg-white transition-[width] duration-300 group-hover:w-full",
                    )}
                  ></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-20 text-white">@2023 Amit Chauhan</div>
      </motion.div>
    </header>
  );
}
