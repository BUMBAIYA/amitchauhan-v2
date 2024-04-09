import { useState } from "react";

import { AnimatePresence, AnimationProps, motion, wrap } from "framer-motion";
import { BiSolidLeftArrow } from "react-icons/bi";

import { classNames } from "@/utility/classNames";

const variant: AnimationProps["variants"] = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export type CoroselProps = {
  aspectRatio: number;
  images: string[];
};

export default function Corosel({ aspectRatio = 1, images }: CoroselProps) {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio }}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          loading="lazy"
          className="h-full w-full bg-cover"
          style={{ aspectRatio }}
          src={images[imageIndex]}
          custom={direction}
          variants={variant}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        ></motion.img>
      </AnimatePresence>
      <div className="absolute bottom-0 flex h-12 w-full items-center justify-center gap-2">
        <button
          onClick={() => paginate(1)}
          className="hidden h-4 w-4 lg:inline-block"
        >
          <BiSolidLeftArrow className="fill-zinc-700 dark:fill-zinc-400" />
        </button>
        {images.map((_, index) => (
          <span
            key={index}
            className={classNames(
              "h-2 w-2 rounded-full",
              index === imageIndex
                ? "bg-accent"
                : "bg-zinc-700 dark:bg-zinc-400",
            )}
          ></span>
        ))}
        <button
          onClick={() => paginate(-1)}
          className="hidden h-4 w-4 lg:inline-block"
        >
          <BiSolidLeftArrow className="rotate-180 fill-zinc-700 dark:fill-zinc-400" />
        </button>
      </div>
    </div>
  );
}
