import { RefObject, useRef } from "react";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";

type TShowCaseLiIcon = {
  iconRef: RefObject<HTMLElement>;
};

function ShowCaseLiIcon(props: TShowCaseLiIcon) {
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
          className="fill-none stroke-accent stroke-1"
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
        <circle cx="50" cy="27" r="10" className="fill-accent stroke-1" />
      </svg>
    </figure>
  );
}

export type TShowCaseListDetatils = {
  title: string;
  organisation: {
    name: string;
    href: string;
  };
  date: string;
  location: string;
  description: string;
};

export function ShowCaseListDetatils(props: TShowCaseListDetatils) {
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
        <h3 className="text-base font-bold text-foreground sm:text-xl md:text-2xl">
          {props.title}{" "}
          <Link
            href={props.organisation.href}
            className="cursor-pointer text-accent"
            target="_blank"
          >
            @{props.organisation.name}
          </Link>
        </h3>
        <span className="text-sm font-medium text-foreground xs:text-base">
          {props.date} | {props.location}
        </span>
        <p className="text-sm font-medium text-muted-foreground xs:text-base">
          {props.description}
        </p>
      </motion.div>
    </li>
  );
}

export type TShowCaseList = {
  title: string;
  details: TShowCaseListDetatils[];
};

export default function ShowCaseList(props: TShowCaseList) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });
  return (
    <div className="mx-auto my-40 max-w-7xl px-6 sm:px-14 md:my-60 md:px-20">
      <h2 className="md:mb-30 mb-16 w-full bg-gradient-to-r from-accent/70 to-accent bg-clip-text text-center text-3xl font-bold text-transparent xs:text-4xl sm:text-6xl md:text-8xl">
        {props.title}
      </h2>
      <div ref={ref} className="relative w-full md:mx-auto md:w-[80%]">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-9 top-5 h-full w-[5px] origin-top rounded-lg bg-accent"
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
