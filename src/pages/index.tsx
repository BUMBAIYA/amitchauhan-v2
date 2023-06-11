import { AnimatePresence } from "framer-motion";
import { PageSEO } from "@/components/PageSEO";
import FadeUp from "@/components/animation/FadeUp";
import CursorTrailCanvas from "@/components/CursorTrailCanvas";

export default function Home() {
  return (
    <>
      <PageSEO
        title="Amit Chauhan | Home"
        description="Homepage of Amit Chauhan's portfolio"
      />
      <CursorTrailCanvas
        color="hsla(183, 64%, 27%, 0.4)"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
      />
      <div className="mx-auto my-24 max-w-7xl">
        <div className="max-w-7xl">
          <AnimatePresence>
            <FadeUp key="title-main" duration={0.6}>
              <h1 className="mx-auto bg-gradient-to-r from-teal-500 to-tera-500 bg-clip-text text-5xl font-bold text-transparent dark:from-teal-200 dark:to-teal-500 sm:text-6xl md:text-8xl">
                Creative frontend developer
              </h1>
            </FadeUp>
            <FadeUp key="description" duration={0.6} delay={0.2}>
              <p className="text-md mt-8 max-w-3xl font-medium text-zinc-900 dark:text-zinc-200 md:text-lg">
                I&apos;m Amit Chauhan, a frontend developer based in Mumbai,
                India. I turn vision into reality with code and design.As a
                skilled frontend developer, I am dedicated to turning ideas into
                innovative web applications.
              </p>
            </FadeUp>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
