import { useCallback, useEffect, useState } from "react";

export function useScreenBreakpoint(breakpoint: number) {
  const [width, setWidth] = useState<boolean>(true);

  const handleResize = useCallback(() => {
    setWidth(window.innerWidth < breakpoint);
  }, [breakpoint]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return width;
}
