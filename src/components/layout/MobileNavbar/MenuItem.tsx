import { Variants, motion } from "framer-motion";
import { tabLink } from "../Navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { classNames } from "@/components/utility/classNames";

type MenuItem = {
  tablink: tabLink;
};

const menuItemVariants: Variants = {
  open: {
    x: [80, -50, 0],
    opacity: 1,
    transition: {
      x: { stiffness: 1000, velocity: -100 },
    },
  },
  close: {
    x: [0, -50, 80],
    opacity: 0,
    transition: {
      x: { stiffness: 1000 },
      duration: 0.4,
    },
  },
};

export default function MenuItem(props: MenuItem) {
  const pathName = usePathname();
  return (
    <motion.li
      variants={menuItemVariants}
      whileHover={{ scale: 1.05 }}
      className="inline text-center md:text-end"
    >
      <Link
        href={props.tablink.href}
        className={classNames(
          pathName === props.tablink.href
            ? "bg-white text-teal-600"
            : "text-white",
          "rounded-full px-3 py-1 text-4xl font-semibold transition-colors duration-200 hover:text-teal-400 sm:text-5xl",
        )}
      >
        {props.tablink.name}
      </Link>
    </motion.li>
  );
}
