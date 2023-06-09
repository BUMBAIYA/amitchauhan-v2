import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  duration: number;
  delay?: number;
  className?: string;
}

export default function FadeRight({
  children,
  duration,
  delay,
  className,
}: Props) {
  return (
    <motion.div
      initial={{ x: -200, opacity: 0 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          duration,
          ease: "easeInOut",
          delay,
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
