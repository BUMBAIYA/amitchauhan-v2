import { Dispatch, Fragment, SetStateAction, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { MailIcon, XIcon } from "lucide-react";

import ContactForm, {
  type ContactFormValues,
} from "@/components/contact-form/contact-form";
import ContactMailToast, {
  type MailSentToastState,
} from "@/components/contact-form/contact-mail-toast";

export interface ContactFormModelProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function ContactFormModal({
  showModal,
  setShowModal,
}: ContactFormModelProps) {
  const [isSendingMail, setIsSendingMail] = useState(false);
  const [toastState, setToastState] = useState<MailSentToastState>({
    type: null,
    value: false,
    message: "",
  });

  const handleSubmit = async (values: ContactFormValues) => {
    setIsSendingMail(true);
    try {
      const response = await fetch("/api/sendmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        setToastState({
          type: "success",
          value: true,
          message: "Successfully sent email",
        });
        setShowModal(false);
      } else {
        setToastState({
          type: response.status === 429 ? "warning" : "failure",
          value: true,
          message:
            response.status === 429
              ? "Rate Limiter: Only 5 email per hour"
              : "Oop! Unable to send email",
        });
      }
    } catch {
      setToastState({
        type: "failure",
        value: true,
        message: "Oop! Unable to send email",
      });
    }
    setIsSendingMail(false);
  };
  return (
    <>
      <Transition show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="z-[999999]"
          onClose={() => setShowModal(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-zinc-600/30 backdrop-blur-md" />
          </Transition.Child>
          <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 top-full"
              enterTo="opacity-100 top-16"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 top-16"
              leaveTo="opacity-0 top-full"
            >
              <Dialog.Panel className="absolute m-4 w-[95%] max-w-xl overflow-y-auto rounded-2xl border-2 border-accent/20 bg-accent px-6 py-8 shadow-lg shadow-accent/10 md:px-10 md:py-16">
                <div className="flex items-center justify-between">
                  <Dialog.Title className="flex items-center gap-1 text-2xl font-semibold text-background sm:gap-2 md:text-4xl">
                    <MailIcon className="h-8 w-8 sm:h-10 sm:w-10" />
                    <span>Send Message</span>
                  </Dialog.Title>
                  <button
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent bg-background p-2 text-sm text-accent transition-transform hover:scale-[1.05] hover:bg-background"
                    onClick={() => setShowModal(false)}
                  >
                    <XIcon className="h-full w-full text-accent" />
                  </button>
                </div>
                <ContactForm
                  isSubmitting={isSendingMail}
                  handleSubmit={handleSubmit}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <ContactMailToast toastState={toastState} showToast={setToastState} />
    </>
  );
}
