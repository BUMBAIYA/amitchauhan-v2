import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { RefObject, useRef } from "react";

type ShowCaseLiIcon = {
  iconRef: RefObject<HTMLElement>;
};

function ShowCaseLiIcon(props: ShowCaseLiIcon) {
  const { scrollYProgress } = useScroll({
    target: props.iconRef,
    offset: ["center end", "center center"],
    layoutEffect: false,
  });
  return (
    <figure className="absolute left-0 stroke-zinc-900">
      <svg width="75" height="75" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="27"
          r="20"
          className="fill-none stroke-teal-600 stroke-1"
        />
        <motion.circle
          style={{
            pathLength: scrollYProgress,
          }}
          cx="50"
          cy="27"
          r="20"
          className="fill-zinc-100 stroke-[5px] dark:fill-zinc-900 dark:stroke-zinc-100"
        />
        <circle
          cx="50"
          cy="27"
          r="10"
          className="fill-teal-600 stroke-1 dark:fill-teal-400"
        />
      </svg>
    </figure>
  );
}

export type ShowCaseListDetatils = {
  title: string;
  organisation: {
    name: string;
    href: string;
  };
  date: string;
  location: string;
  description: string;
};

export function ShowCaseListDetatils(props: ShowCaseListDetatils) {
  const ref = useRef(null);
  return (
    <li ref={ref} className="mx-auto mb-14 flex w-[60%] flex-col gap-1">
      <ShowCaseLiIcon iconRef={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{
          type: "spring",
          duration: 0.4,
        }}
      >
        <h3 className="text-base font-bold sm:text-xl md:text-2xl">
          {props.title}{" "}
          <Link
            href={props.organisation.href}
            className="cursor-pointer text-teal-600 dark:text-teal-400"
            target="_blank"
          >
            @{props.organisation.name}
          </Link>
        </h3>
        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 xs:text-base">
          {props.date} | {props.location}
        </span>
        <p className="text-sm font-medium xs:text-base">{props.description}</p>
      </motion.div>
    </li>
  );
}

export type ShowCaseList = {
  title: string;
  details: ShowCaseListDetatils[];
};

export default function ShowCaseList(props: ShowCaseList) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });
  return (
    <div className="mx-auto my-40 max-w-7xl md:my-60">
      <h2 className="md:mb-30 mb-16 w-full bg-gradient-to-r from-teal-400 to-tera-500 bg-clip-text text-center text-3xl font-bold text-transparent dark:from-teal-200 dark:to-teal-500 xs:text-4xl sm:text-6xl md:text-8xl">
        {props.title}
      </h2>
      <div ref={ref} className="relative w-full md:mx-auto md:w-[80%]">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-9 top-5 h-full w-[5px] origin-top rounded-lg bg-teal-600 dark:bg-teal-400"
        ></motion.div>
        <ul className="ml-4 w-full items-center">
          {props.details.map((_details, index) => (
            <ShowCaseListDetatils key={index} {..._details} />
          ))}
        </ul>
      </div>
    </div>
  );
}
