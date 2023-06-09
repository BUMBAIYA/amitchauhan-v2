import Image from "next/image";
import { PageSEO } from "@/components/PageSEO";
import FadeUp from "@/components/animation/FadeUp";
import CursorTrailCanvas from "@/components/hero/CursorTrailCanvas";
import { AnimatePresence } from "framer-motion";
import heroProfileImg from "../../public/images/hero-profile.png";
import FadeRight from "@/components/animation/FadeRight";

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
      <div className="mx-auto mt-0 flex max-w-7xl flex-col items-center gap-6 text-center md:mt-20 md:flex-row lg:mt-0 lg:text-left">
        <div className="-z-50 w-full sm:w-1/2 md:hidden lg:inline-block lg:h-full lg:w-1/2">
          <AnimatePresence>
            <FadeUp key="hero-image" duration={0.6}>
              <Image
                src={heroProfileImg}
                width={100}
                height={100}
                className="h-auto w-full px-0 xl:px-16"
                alt="hero image"
                unoptimized
              />
            </FadeUp>
          </AnimatePresence>
        </div>
        <div className="sm:1/2 w-full lg:w-1/2">
          <AnimatePresence>
            <FadeUp key="title-greeting" duration={0.6}>
              <h1 className="bg-gradient-to-r from-teal-500 to-tera-500 bg-clip-text text-6xl font-bold text-transparent dark:from-teal-200 dark:to-teal-500 sm:text-7xl md:text-7xl">
                I&apos;m Amit
              </h1>
            </FadeUp>
            <FadeUp key="title-main" duration={0.6} delay={0.2}>
              <h2 className="mt-2 bg-gradient-to-r from-teal-500 to-tera-500 bg-clip-text text-2xl font-semibold text-transparent dark:from-teal-200 dark:to-teal-500 sm:text-4xl md:text-3xl">
                Creative frontend developer
              </h2>
            </FadeUp>
            <FadeUp key="description" duration={0.6} delay={0.2}>
              <p className="mt-8 text-base font-medium text-zinc-900 dark:text-zinc-300 sm:text-lg md:text-lg">
                I turn vision into reality with code. Explore my latest projects
                and blogs, showcasing my expertise in Reactjs, Nextjs and web
                development
              </p>
            </FadeUp>
            <FadeRight
              key="hero-location"
              duration={0.6}
              delay={0.6}
              className="mr-0 mt-8 flex items-center justify-center gap-4 lg:mr-8 lg:justify-end"
            >
              <div className="relative flex w-12 gap-4 overflow-hidden rounded-md">
                <Image
                  className="h-full w-full bg-cover bg-no-repeat"
                  alt="Indian flag"
                  src="https://flagcdn.com/in.svg"
                  width={15}
                  height={15}
                />
              </div>
              <span className="text-lg font-medium">Mumbai, India</span>
            </FadeRight>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
