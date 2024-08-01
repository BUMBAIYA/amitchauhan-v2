import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

export interface CustomToastProps {
  children: ReactNode;
  duration: number;
  open: boolean;
  onClose: () => void;
  className?: string;
}

export default function CustomToast({
  children,
  duration = 3000,
  open,
  onClose,
  className,
}: CustomToastProps) {
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
