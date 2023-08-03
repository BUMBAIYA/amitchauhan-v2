import { motion } from "framer-motion";
import { classNames } from "./utility/classNames";
import Link from "next/link";

export type ProjectData = {
  index: number;
  title: string;
  href: string;
  tags: string[];
  image: {
    LIGHT: string;
    DARK?: string;
  };
};

export type ProjectList = {
  data: ProjectData;
  activeProject: number;
  toggleList: (index: number) => void;
};

export default function ProjectList(props: ProjectList) {
  return (
    <motion.div
      className={classNames("group flex gap-4 ")}
      onHoverStart={(e) => props.toggleList(props.data.index)}
    >
      <span
        className={classNames(
          "hidden text-6xl font-semibold transition-colors duration-300 lg:block",
          props.activeProject === props.data.index
            ? "text-teal-600 dark:text-teal-400"
            : "text-teal-600/30 dark:text-teal-600/50",
        )}
      >
        {props.data.index + 1}.
      </span>
      <span className="text-3xl font-semibold text-teal-600 transition-colors duration-300 dark:text-teal-400 sm:text-4xl md:text-5xl lg:hidden">
        {props.data.index + 1}.
      </span>
      <div className="flex flex-col gap-2">
        <Link href={props.data.href} className="relative max-w-max">
          <span
            className={classNames(
              "hidden text-6xl font-semibold transition-colors duration-300 lg:block",
              props.activeProject === props.data.index
                ? "text-teal-600 dark:text-teal-400"
                : "text-teal-600/30 dark:text-teal-600/50",
            )}
          >
            {props.data.title}
          </span>
          <span className="hover:-underline-offset-1 text-3xl font-semibold text-teal-600 transition-colors duration-300 hover:underline dark:text-teal-400 sm:text-4xl md:text-5xl lg:hidden">
            {props.data.title}
          </span>
          <span
            className={classNames(
              "absolute -bottom-1 left-0 hidden h-1 origin-left rounded-lg bg-teal-600 transition-[width] duration-300 group-hover:w-full dark:bg-teal-400 lg:block",
              props.activeProject === props.data.index ? "w-full" : "w-0",
            )}
          ></span>
        </Link>
        <p className="max-w-xl text-base font-semibold text-zinc-800 dark:text-zinc-100 sm:text-lg">
          {props.data.tags.map((tag) => `#${tag} `)}
        </p>
      </div>
    </motion.div>
  );
}
