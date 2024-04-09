import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { AnimatePresence, motion } from "framer-motion";

import { ArrowTopRight } from "@/components/icons";
import ProjectShowcaseList, {
  type ProjectShowcaseListItem,
} from "@/components/projects/project-showcase-list";

const generateImageData = (proj: ProjectShowcaseListItem[]) => {
  return proj.map((p) => p.image);
};

interface ProjectShowcaseProps {
  projects: ProjectShowcaseListItem[];
}

export default function ProjectShowcase(props: ProjectShowcaseProps) {
  const [currentImage, setCurrentImage] = useState<number>(0);

  const images = useMemo(() => {
    return generateImageData(props.projects);
  }, [props.projects]);

  const handleAnimate = (index: number) => {
    if (index === currentImage) return;
    setCurrentImage(index);
  };

  return (
    <section className="overflow-hidden px-6 py-32 sm:px-14 md:px-20">
      <div className="relative mx-auto max-w-7xl">
        <div className="relative right-0 top-0 hidden lg:block">
          <AnimatePresence>
            <motion.div
              key={props.projects[currentImage].title}
              initial={{ x: "100%", opacity: 0 }}
              animate={{
                x: "55%",
                y: "50%",
                opacity: 1,
                transition: {
                  duration: 0.5,
                },
              }}
              transition={{
                type: "spring",
                stiffness: 100,
              }}
              className="absolute right-0 top-0 -z-50"
            >
              <Image
                src={images[currentImage].LIGHT}
                unoptimized
                width={100}
                height={100}
                className="h-auto w-1/2 rounded-lg border border-zinc-300 shadow-lg dark:hidden dark:border-accent/50"
                alt={`project ${currentImage}`}
              />
              {images[currentImage].DARK !== undefined && (
                <Image
                  src={images[currentImage].DARK!}
                  unoptimized
                  width={100}
                  height={100}
                  className="hidden h-auto w-1/2 rounded-lg border border-zinc-300 shadow-lg dark:inline-block dark:border-accent/20 dark:shadow-lg dark:shadow-emerald-400/5"
                  alt={`project ${currentImage}`}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <h2 className="text-xl font-semibold text-accent sm:text-3xl">
          My projects
        </h2>
        <div className="hidden flex-col gap-6 py-14 sm:gap-8 sm:py-20 md:gap-10 lg:flex">
          {props.projects.map((proj, index) => (
            <ProjectShowcaseList
              activeProject={currentImage}
              toggleList={handleAnimate}
              data={proj}
              key={index}
            />
          ))}
        </div>
        <div className="flex flex-col gap-4 py-14 sm:gap-8 sm:py-20 md:gap-10 lg:hidden">
          {props.projects.map((proj) => (
            <Link
              key={proj.title}
              href={proj.href}
              className="flex flex-col gap-1"
            >
              <div className="flex gap-2">
                <span className="text-3xl font-semibold text-accent transition-colors duration-300 sm:text-4xl md:text-5xl lg:hidden">
                  {proj.index + 1}.
                </span>
                <span
                  key={proj.title}
                  className="-underline-offset-1 text-3xl font-semibold text-accent underline transition-colors duration-300 sm:text-4xl md:text-5xl lg:hidden"
                >
                  {proj.title}
                </span>
              </div>
              <p className="flex max-w-xl flex-wrap gap-2 text-base font-semibold text-accent-foreground sm:text-lg">
                {proj.tags.map((tag, index) => (
                  <span key={index}>#{tag}</span>
                ))}
              </p>
            </Link>
          ))}
        </div>
        <Link
          href="/projects"
          className="group relative flex max-w-max items-center gap-4 text-base font-semibold sm:text-lg md:text-xl"
        >
          <div className="relative max-w-max">
            <span className="text-accent">See more projects</span>
            <span className="absolute -bottom-1 left-0 h-[2px] w-0 origin-left rounded-lg bg-accent transition-[width] duration-300 group-hover:w-full"></span>
          </div>
          <div className="h-8 w-8">
            <ArrowTopRight className="rotate-45 text-accent transition-transform duration-300 group-hover:rotate-0 group-hover:scale-[1.1]" />
          </div>
        </Link>
      </div>
    </section>
  );
}
