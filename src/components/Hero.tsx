import { AnimatePresence, motion } from "framer-motion";
import FadeUp from "./animation/FadeUp";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  let progress = 0;
  const { current: elContainer } = ref;

  if (elContainer) {
    progress = Math.min(1, scrollY / elContainer.clientHeight);
  }

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      animate={{
        transform: `translateY(${progress * 20}vh)`,
      }}
      transition={{ type: "spring", stiffness: 100 }}
      ref={ref}
      className="flex h-[calc(100vh-112px)] items-center px-6 sm:px-14 md:px-20"
    >
      <div className="mx-auto -mt-[112px] max-w-7xl">
        <div className="max-w-7xl">
          <AnimatePresence>
            <FadeUp key="title-main" duration={0.6}>
              <h1 className="mx-auto bg-gradient-to-r from-teal-500 to-tera-500 bg-clip-text text-5xl font-bold text-transparent dark:from-teal-200 dark:to-teal-500 sm:text-6xl md:text-7xl xl:text-8xl">
                Creative frontend developer
              </h1>
            </FadeUp>
            <FadeUp key="description" duration={0.6} delay={0.2}>
              <div className="mt-8 max-w-3xl text-base font-semibold text-zinc-900 dark:text-zinc-200 sm:text-base md:text-2xl">
                <span className="text-xl text-teal-600 dark:text-teal-300 sm:text-3xl">
                  Hi
                </span>
                , I&apos;m
                <span className="text-teal-600 dark:text-teal-300">
                  {" "}
                  Amit Chauhan
                </span>{" "}
                , I turn vision into reality with code and design.
              </div>
            </FadeUp>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
