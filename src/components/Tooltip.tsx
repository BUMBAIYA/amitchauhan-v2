import { CSSProperties, ReactNode, useEffect, useRef } from "react";
import { classNames } from "@/utility/classNames";

export type TTooltip = {
  className?: string;
  style?: CSSProperties;
  title: string;
  titleClassName?: string;
  children: ReactNode;
};

export default function Tooltip(props: TTooltip) {
  const ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLElement>(null);
  function showTooltip() {
    titleRef.current!.style.display = "inline-flex";
  }
  function hideTooltip() {
    titleRef.current!.style.display = "none";
  }
  useEffect(() => {
    const elm = ref.current!;
    elm.addEventListener("mouseover", showTooltip);
    elm.addEventListener("mouseout", hideTooltip);
    return () => {
      elm.removeEventListener("mouseover", showTooltip);
      elm.removeEventListener("mouseout", hideTooltip);
    };
  }, []);
  return (
    <div
      ref={ref}
      className={classNames(
        "relative w-max",
        props.className ? props.className : "",
      )}
    >
      <span
        className={classNames(
          "absolute bottom-[120%] hidden",
          props.titleClassName ? props.titleClassName : "",
        )}
        ref={titleRef}
      >
        {props.title}
      </span>
      {props.children}
    </div>
  );
}
