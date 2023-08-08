import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  duration: number;
  delay?: number;
  className?: string;
  whileInView?: boolean;
}

export default function FadeRight({
  children,
  duration,
  delay,
  className,
  whileInView = false,
}: Props) {
  const animation = {
    opacity: 1,
    x: 0,
    transition: {
      duration,
      ease: "easeInOut",
      delay,
    },
  };
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      whileInView={whileInView ? animation : {}}
      animate={!whileInView ? animation : {}}
      className={className}
    >
      {children}
    </motion.div>
  );
}
