import {
  Fragment,
  useRef,
  useState,
  MouseEvent as RMouseEvent,
  useEffect,
} from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useAutosizeTextArea } from "@/hooks/useAutoSizeTextarea";
import { CheckIcon, DangerIcon, MailIcon } from "@/components/Icons";
import { verifyEmailAddress } from "@/utility/verifyEmail";
import { Toast } from "@/components/Toast";
import { classNames } from "@/utility/classNames";

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ContactFormError = {
  name: boolean;
  email: boolean | "invalid";
  subject: boolean;
  message: boolean;
};

const initialError: ContactFormError = {
  name: false,
  email: false,
  subject: false,
  message: false,
};

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

type Fields = "name" | "email" | "subject" | "message";

const fields: Fields[] = ["name", "email", "subject", "message"];

type ToastType = "PASS" | "FAIL" | null;

export function ContactForm() {
  const refTextArea = useRef<HTMLTextAreaElement>(null);
  const abortController = useRef<AbortController | null>(null);
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [showToast, setShowToast] = useState<{
    type: ToastType;
    value: boolean;
  }>({ type: null, value: false });
  useAutosizeTextArea(refTextArea, formData.message, "128px");

  const [isSendingMail, setIsSendingMail] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [errors, setErrors] = useState<ContactFormError>(initialError);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    if (abortController.current) {
      abortController.current.abort();
    }
    setIsOpenModal(false);
    setErrors(initialError);
    setFormData(initialFormData);
    setIsSendingMail(false);
  };

  const handleValidation = () => {
    const newErrors = { ...errors };
    fields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = true;
      } else {
        newErrors[field] = false;
      }
    });
    return newErrors;
  };

  const handleSubmit = async (
    e: RMouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setErrors(handleValidation());
    if (
      formData.name !== "" &&
      formData.email !== "" &&
      formData.subject !== "" &&
      formData.message
    ) {
      if (verifyEmailAddress(formData.email)) {
        setIsSendingMail(true);

        const newAbortController = new AbortController();
        abortController.current = newAbortController;

        try {
          const response = await fetch("/api/sendmail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            signal: newAbortController.signal,
          });

          if (response) {
            setErrors(initialError);
            setFormData(initialFormData);
            setIsSendingMail(false);
            setShowToast({ type: "PASS", value: true });
          } else {
            setIsSendingMail(false);
            setShowToast({ type: "FAIL", value: true });
          }
        } catch (error) {
          if (error instanceof DOMException && error.name === "AbortError") {
            // eslint-disable-next-line
            console.warn("Aborted sending mail");
          } else {
            // eslint-disable-next-line
            console.error("[Error]: Unable to send mail");
          }
        }
      } else {
        setErrors((prev) => ({ ...prev, email: "invalid" }));
      }
    }
  };

  const handleValueChange = (value: string, key: Fields) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors(initialError);
  };

  useEffect(() => {
    return () => {
      const controller = abortController.current;
      if (controller) {
        controller.abort();
      }
    };
  }, []);

  return (
    <>
      {showToast && (
        <Toast
          open={showToast.value}
          duration={5000}
          onClose={() => setShowToast((prev) => ({ ...prev, value: false }))}
          className={classNames(
            "fixed right-4 top-6 z-[9999] rounded-lg bg-teal-500 px-4 py-2 font-semibold text-white shadow-xl",
            showToast.type === "PASS" ? "bg-teal-500" : "bg-red-600",
          )}
        >
          <div className="flex w-full max-w-xs items-center gap-2">
            {showToast.type === "PASS" ? (
              <CheckIcon className="h-6 w-6 md:h-8 md:w-8" />
            ) : (
              <DangerIcon className="h-6 w-6 md:h-8 md:w-8" />
            )}

            <span className="text-sm md:text-xl">
              {showToast.type === "PASS" ? "Mail sent" : "Mail failed"}
            </span>
          </div>
        </Toast>
      )}

      <div className="text-center">
        <button
          className="inline-flex items-center gap-2 rounded-md bg-zinc-100 px-3 py-2 text-teal-600 transition-transform duration-150 focus-within:scale-[1.05] hover:scale-[1.05] hover:bg-white"
          onClick={handleOpenModal}
        >
          <span className="block h-6 w-6 sm:h-7 sm:w-7 lg:h-9 lg:w-9">
            <MailIcon />
          </span>
          <span className="text-base font-semibold sm:text-lg lg:text-xl">
            Send Message
          </span>
        </button>
      </div>
      <Transition show={isOpenModal} as={Fragment}>
        <Dialog as="div" className="z-10" onClose={handleCloseModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 backdrop-blur-sm" />
          </Transition.Child>
          <div className="fixed inset-0 flex items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 top-full"
              enterTo="opacity-100 top-32"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 top-32"
              leaveTo="opacity-0 top-full"
            >
              <Dialog.Panel className="absolute m-4 max-h-[calc(100vh-128px)] w-[95%] max-w-xl overflow-y-auto rounded-2xl border-2 border-teal-100/20 bg-teal-600 px-6 py-8 shadow-lg shadow-teal-200/10 dark:bg-teal-700 md:px-10 md:py-16">
                <div className="flex items-center justify-between">
                  <Dialog.Title className="flex items-center gap-1 text-2xl font-semibold text-zinc-100 sm:gap-2 md:text-4xl">
                    <span className="inline-block h-8 w-8 sm:h-12 sm:w-12">
                      <MailIcon />
                    </span>
                    <span>Send Message</span>
                  </Dialog.Title>
                  <button
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-teal-600 bg-teal-50 p-2 text-sm text-teal-600 transition-transform hover:scale-[1.05] hover:bg-teal-100"
                    onClick={handleCloseModal}
                  >
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 23 23"
                      className="ml-[1px] mt-1 stroke-tera-500 dark:stroke-teal-600"
                    >
                      <path
                        fill="transparent"
                        strokeWidth="3"
                        strokeLinecap="round"
                        d="M 3 16.5 L 17 2.5"
                      ></path>
                      <path
                        fill="transparent"
                        strokeWidth="3"
                        strokeLinecap="round"
                        d="M 2 9.423 L 20 9.423"
                        opacity="0"
                      ></path>
                      <path
                        fill="transparent"
                        strokeWidth="3"
                        strokeLinecap="round"
                        d="M 3 2.5 L 17 16.346"
                      ></path>
                    </svg>
                  </button>
                </div>
                <form className="mt-6 flex flex-col gap-4">
                  <div className="relative flex flex-col">
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full rounded-lg border-none bg-teal-50 font-semibold text-teal-800 focus-within:border-2 focus-within:border-teal-600  focus-within:ring-teal-600"
                      value={formData.name}
                      onChange={(e) =>
                        handleValueChange(e.target.value, "name")
                      }
                    />
                    {errors.name && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-red-400 md:text-sm">
                        Required
                      </span>
                    )}
                  </div>
                  <div className="relative flex flex-col">
                    <input
                      type="text"
                      placeholder="Email"
                      className="w-full rounded-lg border-none bg-teal-50 font-semibold text-teal-800 focus-within:border-2 focus-within:border-teal-600  focus-within:ring-teal-600"
                      value={formData.email}
                      onChange={(e) =>
                        handleValueChange(e.target.value, "email")
                      }
                    />
                    {errors.email && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-red-400 md:text-sm">
                        {errors.email === "invalid"
                          ? "Invalid mail"
                          : "Required"}
                      </span>
                    )}
                  </div>
                  <div className="relative flex flex-col">
                    <input
                      type="text"
                      placeholder="Subject"
                      className="w-full rounded-lg border-none bg-teal-50 font-semibold text-teal-800 focus-within:border-2 focus-within:border-teal-600  focus-within:ring-teal-600"
                      value={formData.subject}
                      onChange={(e) =>
                        handleValueChange(e.target.value, "subject")
                      }
                    />
                    {errors.subject && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-red-400 md:text-sm">
                        Required
                      </span>
                    )}
                  </div>
                  <div className="relative flex flex-col">
                    <textarea
                      ref={refTextArea}
                      placeholder="Message"
                      className="h-32 w-full rounded-lg border-none bg-teal-50 font-semibold text-teal-800 focus-within:border-2 focus-within:border-teal-600 focus-within:ring-teal-600"
                      value={formData.message}
                      onChange={(e) =>
                        handleValueChange(e.target.value, "message")
                      }
                    />
                    {errors.message && (
                      <span className="absolute right-4 top-4 text-xs font-bold text-red-400 md:text-sm">
                        Required
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="mt-4 w-full rounded-full bg-teal-50 px-4 py-3 text-center text-lg font-semibold text-teal-900 transition-colors duration-150 hover:bg-teal-100"
                    onClick={handleSubmit}
                    disabled={isSendingMail}
                  >
                    {isSendingMail ? (
                      <div className="inline-flex items-center gap-4">
                        <span className="h-4 w-4">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            height="100%"
                            width="100%"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z">
                              <animateTransform
                                attributeName="transform"
                                attributeType="XML"
                                type="rotate"
                                dur="1s"
                                from="0 12 12"
                                to="360 12 12"
                                repeatCount="indefinite"
                              />
                            </path>
                          </svg>
                        </span>
                        <span>Sending</span>
                      </div>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
