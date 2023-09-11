import { RefObject, useEffect } from "react";

export function useAutosizeTextArea(
  ref: RefObject<HTMLTextAreaElement>,
  value: string,
  defaultHeight: string = "auto",
) {
  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = defaultHeight;
      const scrollHeight = ref.current.scrollHeight;
      ref.current.style.height = scrollHeight + "px";
    }
  }, [ref, value, defaultHeight]);
}
