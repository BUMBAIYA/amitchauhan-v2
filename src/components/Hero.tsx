import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FadeUp from "@/animation/FadeUp";
import CursorTrailCanvas from "@/components/CursorTrailCanvas";

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
    <motion.section
      animate={{
        transform: `translateY(${progress * 20}vh)`,
      }}
      transition={{ type: "spring", stiffness: 100 }}
      ref={ref}
      className="pointer-events-none relative flex max-h-[800px] min-h-[calc(100vh-200px)] items-center px-6 pt-16 sm:px-14 md:h-[calc(100vh-200px)] md:min-h-max md:px-20"
    >
      <CursorTrailCanvas
        color="hsla(183, 64%, 27%, 0.4)"
        className="pointer-events-none absolute inset-0 left-0 top-0 -z-10 mx-auto h-full w-full max-w-screen-2xl"
      />
      <div className="-mt-[112px] w-full">
        <div className="mx-auto max-w-7xl">
          <AnimatePresence>
            <FadeUp key="title-main" duration={0.6}>
              <h1 className="bg-gradient-to-r from-teal-500 to-tera-500 bg-clip-text py-2 text-5xl font-bold text-transparent dark:from-teal-200 dark:to-teal-500 sm:text-6xl md:text-7xl xl:text-8xl">
                Amit Chauhan
              </h1>
              <span className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 md:text-3xl">
                Frontend and React.js developer
              </span>
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
    </motion.section>
  );
}
