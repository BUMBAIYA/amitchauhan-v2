import { Dispatch, SetStateAction } from "react";

import { MailIcon } from "@/components/icons";

export interface FloatingMailButtonProps {
  openModal: Dispatch<SetStateAction<boolean>>;
}

export const floatingMailButtonoptions = {
  root: null,
  rootMargin: "100px",
  threshold: 0.1,
};

export default function FloatingMailButton({
  openModal,
}: FloatingMailButtonProps) {
  return (
    <button
      aria-label="open send mail modal"
      type="button"
      className="fixed bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent p-2 text-background transition-colors duration-150 hover:bg-accent/80 sm:bottom-8 sm:right-8 sm:h-14 sm:w-14 sm:p-3 lg:h-16 lg:w-16"
      onClick={() => openModal(true)}
    >
      <MailIcon />
    </button>
  );
}
