import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { classNames } from "./utility/classNames";

export type ProjectCard = {
  caption?: string;
  title: string;
  date: string;
  description: string;
  imageUrl: string | StaticImageData;
  darkImageUrl?: string | StaticImageData;
  websiteLink?: string;
  caseStudyLink?: string;
  sourceCode: string;
};

export default function ProjectCard(props: ProjectCard) {
  return (
    <motion.div
      initial={{ y: 80 }}
      whileInView={{ y: 0 }}
      transition={{
        type: "spring",
        duration: 0.4,
      }}
      className="xl:grid-row-1 group mx-auto grid max-w-7xl grid-cols-1 gap-4 rounded-xl border border-zinc-400/20 bg-white p-6 transition-shadow duration-200 hover:shadow-md dark:border-teal-500/30 dark:bg-zinc-800 sm:p-8 lg:grid-cols-2 lg:gap-8 xl:grid-cols-3 xl:p-10"
    >
      <div className="relative flex items-center lg:col-span-1 xl:col-span-2">
        <Image
          alt="covidTracker image"
          src={props.imageUrl}
          width={20}
          height={20}
          className={classNames(
            props.darkImageUrl ? "dark:hidden" : "",
            "h-auto w-full rounded-sm outline outline-1 outline-zinc-200 transition-all duration-200 group-hover:scale-[1.01] sm:rounded-md",
          )}
          unoptimized
        />
        {props.darkImageUrl && (
          <Image
            alt="covidTracker image"
            src={props.darkImageUrl}
            width={20}
            height={20}
            className="hidden h-auto w-full rounded-sm outline outline-1 outline-zinc-700 transition-all duration-200 group-hover:scale-[1.01] dark:block sm:rounded-md"
            unoptimized
          />
        )}
      </div>
      <div className="flex flex-col lg:justify-between">
        <div className="flex flex-col">
          {props.caption && (
            <div className="text-sm font-bold text-tera-500 dark:text-teal-400 sm:text-base">
              <span>{props.caption}</span>
            </div>
          )}
          <div>
            <h2 className="mt-2 text-xl font-bold md:text-4xl">
              {props.title}
            </h2>
          </div>
          <span className="mt-1 text-sm font-medium">{props.date}</span>
          <p className="mt-4 max-w-3xl text-sm font-medium text-zinc-900 dark:text-zinc-200 md:text-base">
            {props.description}
          </p>
        </div>
        <div className="mt-8 flex items-center gap-8">
          <a
            href={props.sourceCode}
            target="_blank"
            className="h-8 w-8 text-black transition-colors duration-100 hover:scale-[1.05] hover:text-teal-600 dark:text-zinc-100 dark:hover:text-teal-400 md:h-10 md:w-10"
          >
            <span className="sr-only">Source Code</span>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 496 512"
              className="sm:text-lg"
              height="100%"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
            </svg>
          </a>
          {props.caseStudyLink && (
            <Link
              href={props.caseStudyLink}
              className="rounded-lg border border-teal-600 px-4 py-2 text-sm font-medium text-teal-600 transition-transform duration-100 hover:scale-[1.05] dark:border-teal-500/30 dark:text-teal-400 md:text-lg"
            >
              Case Study
            </Link>
          )}
          {props.websiteLink && (
            <a
              href={props.websiteLink}
              target="_blank"
              className="text-lg font-medium underline underline-offset-4 transition-colors duration-150 hover:text-teal-600 dark:hover:text-teal-400"
            >
              Visit
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
