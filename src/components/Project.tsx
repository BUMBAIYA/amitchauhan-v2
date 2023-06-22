import Image from "next/image";
import { ArrowTopRight } from "./Icons";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ProjectList, { ProjectData } from "./ProjectList";
import Link from "next/link";

const generateImageData = (proj: ProjectData[]) => {
  return proj.map((p) => p.image);
};

type Project = {
  projects: ProjectData[];
};

export default function Project(props: Project) {
  const [currentImage, setCurrentImage] = useState<number>(0);

  const [images, setImages] = useState<string[]>(
    generateImageData(props.projects),
  );

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
              key={images[currentImage]}
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
                src={images[currentImage]}
                unoptimized
                width={100}
                height={100}
                className="h-auto w-1/2 rounded-lg border border-zinc-300 shadow-lg dark:border-teal-400/50"
                alt={`project ${currentImage}`}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <h2 className="text-lg font-semibold sm:text-2xl">My projects</h2>
        <div className="flex flex-col gap-6 py-14 sm:gap-8 sm:py-20 md:gap-10">
          {props.projects.map((proj, index) => (
            <ProjectList
              activeProject={currentImage}
              toggleList={handleAnimate}
              data={proj}
              key={index}
            />
          ))}
        </div>
        <Link
          href="#"
          className="group relative flex max-w-max items-center gap-4 text-base font-semibold sm:text-lg md:text-xl"
        >
          <div className="relative max-w-max">
            <span>See more projects</span>
            <span className="absolute -bottom-1 left-0 h-[2px] w-0 origin-left rounded-lg bg-teal-600 transition-[width] duration-300 group-hover:w-full dark:bg-teal-400"></span>
          </div>
          <div className="h-8 w-8">
            <ArrowTopRight className="rotate-45 text-teal-600 transition-transform duration-300 group-hover:rotate-0 group-hover:scale-[1.1] dark:text-teal-400" />
          </div>
        </Link>
      </div>
    </section>
  );
}
