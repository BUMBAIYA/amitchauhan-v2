import { Dispatch, SetStateAction } from "react";

import { CircleCheckIcon, TriangleAlertIcon } from "lucide-react";

import CustomToast from "@/components/utility/custom-toast";
import { classNames } from "@/utility/classNames";

type ToastType = "success" | "failure" | "warning" | null;
export type MailSentToastState = {
  type: ToastType;
  value: boolean;
  message: string;
};

export interface MailSentToastProps {
  showToast: Dispatch<SetStateAction<MailSentToastState>>;
  toastState: MailSentToastState;
}

export default function ContactMailToast({
  toastState,
  showToast,
}: MailSentToastProps) {
  return toastState.value ? (
    <CustomToast
      open={toastState.value}
      duration={3000}
      onClose={() => showToast((prev) => ({ ...prev, value: false }))}
      className={classNames(
        "fixed right-4 top-6 z-[9999] rounded-lg bg-accent px-4 py-2 font-semibold text-white shadow-xl",
        toastState.type === "success"
          ? "bg-teal-500"
          : toastState.type === "warning"
          ? "bg-yellow-500"
          : "bg-red-600",
      )}
    >
      <div className="flex w-full max-w-xs items-center gap-2">
        {toastState.type === "success" ? (
          <CircleCheckIcon className="h-6 w-6 md:h-8 md:w-8" />
        ) : (
          <TriangleAlertIcon className="h-6 w-6 md:h-8 md:w-8" />
        )}

        <span className="text-sm md:text-xl">{toastState.message}</span>
      </div>
    </CustomToast>
  ) : null;
}
