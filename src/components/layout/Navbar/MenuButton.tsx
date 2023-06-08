import { SVGMotionProps, motion } from "framer-motion";

const Path = (props: SVGMotionProps<SVGPathElement>) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    strokeLinecap="round"
    {...props}
  />
);

type MenuLogo = {
  open: boolean;
  toggle: () => void;
};

export default function MenuLogo(props: MenuLogo) {
  return (
    <button
      onClick={props.toggle}
      className="mt-1 flex h-12 w-12 items-center gap-1 py-1 font-semibold"
    >
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 23 23"
        className="stroke-teal-600"
        animate={props.open ? "open" : "close"}
      >
        <Path
          variants={{
            close: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            close: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            close: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
        />
      </motion.svg>
    </button>
  );
}
