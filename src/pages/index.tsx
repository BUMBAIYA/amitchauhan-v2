import { PageSEO } from "@/components/PageSEO";
import FadeUp from "@/components/animation/FadeUp";
import CursorTrailCanvas from "@/components/hero/CursorTrailCanvas";
import { AnimatePresence } from "framer-motion";

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
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <AnimatePresence>
            <FadeUp key="title-main" duration={0.6}>
              <h1 className="bg-gradient-to-r from-teal-500 to-tera-500 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl md:text-7xl">
                Creative frontend developer
              </h1>
            </FadeUp>
            <FadeUp key="description" duration={0.6} delay={0.2}>
              <p className="mt-8 text-lg font-semibold text-zinc-600 md:text-xl">
                I&apos;m Amit Chauhan, a frontend developer based in Mumbai,
                India. I craft captivative user intefaces and designs.
              </p>
            </FadeUp>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
