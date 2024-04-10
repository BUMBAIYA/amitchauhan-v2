import { ReactNode } from "react";

import { motion } from "framer-motion";

export interface FadeRightProps {
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
}: FadeRightProps) {
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
      whileInView={whileInView ? animation : undefined}
      animate={!whileInView ? animation : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}
