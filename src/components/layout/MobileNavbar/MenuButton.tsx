import { SVGMotionProps, motion } from "framer-motion";

const Path = (props: SVGMotionProps<SVGPathElement>) => (
  <motion.path
    strokeWidth="3"
    strokeLinecap="round"
    stroke="rgb(13, 148 ,136)"
    {...props}
  />
);

type MenuButton = {
  toggle: () => void;
};

export function MenuButton(props: MenuButton) {
  return (
    <button
      type="button"
      aria-label="menu button"
      onClick={props.toggle}
      className="absolute right-6 top-6 flex h-16 w-16 items-center justify-center rounded-full p-4 pt-5 shadow-sm backdrop-blur-sm"
    >
      <svg width="100%" height="100%" viewBox="0 0 23 23">
        <Path
          variants={{
            close: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5", stroke: "#fff" },
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
            open: { d: "M 3 2.5 L 17 16.346", stroke: "#fff" },
          }}
        />
      </svg>
    </button>
  );
}
