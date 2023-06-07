import { Variants, motion } from "framer-motion";
import { LINKS } from "../Navbar";
import MenuItem from "./MenuItem";

const navVariants: Variants = {
  open: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  close: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

export default function Navigation() {
  return (
    <motion.ul
      variants={navVariants}
      className="flex min-h-screen w-full flex-col gap-10 pb-20 pt-36"
    >
      {LINKS.map((link, i) => (
        <MenuItem tablink={link} key={i} />
      ))}
      <div className="flex-1"></div>
      <div className="text-center text-base font-semibold text-white">
        © 2023 — Amit Chauhan
      </div>
    </motion.ul>
  );
}
