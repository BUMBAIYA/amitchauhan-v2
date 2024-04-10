import { RefObject, useRef } from "react";
import Link from "next/link";

import { motion, useScroll } from "framer-motion";

export interface ExperienceListIconProps {
  iconRef: RefObject<HTMLElement>;
}

function ShowCaseLiIcon(props: ExperienceListIconProps) {
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

export interface ExperienceShowcaseListItemProps {
  title: string;
  organisation: {
    name: string;
    href: string;
  };
  date: string;
  location: string;
  description: string;
}

export default function ExperienceShowcaseListItem(
  props: ExperienceShowcaseListItemProps,
) {
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
            rel="nofollow"
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
