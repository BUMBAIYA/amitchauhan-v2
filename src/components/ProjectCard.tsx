import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { classNames } from "./utility/classNames";
import Tooltip from "./Tooltip";
import { GithubIcon } from "./Icons";

export type ProjectCard = {
  caption?: string;
  title: string;
  date: string;
  description: string;
  image: {
    url: string | StaticImageData;
    alt: string;
  };
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
          alt={props.image.alt}
          src={props.image.url}
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
            alt={props.image.alt}
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
            <h2 className="mt-2 text-xl font-bold sm:text-3xl md:text-3xl">
              {props.title}
            </h2>
          </div>
          <span className="mt-1 text-sm font-medium">{props.date}</span>
          <p className="mt-4 max-w-3xl text-sm font-medium text-zinc-900 dark:text-zinc-200 md:text-base">
            {props.description}
          </p>
        </div>
        <div className="mt-8 flex items-center gap-8">
          <Tooltip
            className="h-8 w-8"
            title="Source Code"
            titleClassName="bg-zinc-200 shadow-lg dark:bg-zinc-900 dark:text-white rounded-lg px-4 py-2 flex"
          >
            <a
              href={props.sourceCode}
              target="_blank"
              className="h-8 w-8 text-black transition-colors duration-100 hover:scale-[1.05] hover:text-teal-600 dark:text-zinc-100 dark:hover:text-teal-400 md:h-10 md:w-10"
            >
              <span className="sr-only">Source Code</span>
              <GithubIcon />
            </a>
          </Tooltip>
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
