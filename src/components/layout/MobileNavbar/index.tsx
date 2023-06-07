import { Variants, motion, useCycle } from "framer-motion";
import { MenuButton } from "./MenuButton";
import Navigation from "./Navigation";

const sidebar: Variants = {
  open: {
    clipPath: "circle(140% at calc(100% - 40px) 40px)",
    transition: {
      type: "spring",
      stiffness: 50,
    },
    animation: "ease-out",
  },
  close: {
    clipPath: "circle(0 at calc(100% - 40px) 40px)",
    transition: {
      delay: 0.4,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
    animation: "ease-in",
  },
};

export default function MobileNavbar() {
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "close"}
      className="absolute inset-0 block md:hidden"
    >
      <motion.div
        className="pointer-events-none fixed inset-0 -z-50 bg-teal-600"
        variants={sidebar}
      ></motion.div>
      <Navigation />
      <MenuButton toggle={toggleOpen} />
    </motion.nav>
  );
}
