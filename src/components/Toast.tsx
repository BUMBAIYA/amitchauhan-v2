import { Transition } from "@headlessui/react";
import {
  Dispatch,
  Fragment,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";

type ToastProps = {
  children: ReactNode;
  duration: number;
  open: boolean;
  onClose: () => void;
  className?: string;
};

export function Toast({
  children,
  duration = 3000,
  open,
  onClose,
  className,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => {
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  if (typeof window === "undefined" || !open) {
    return null;
  }

  return createPortal(
    <div className={className}>{children}</div>,
    document.body,
  );
}
