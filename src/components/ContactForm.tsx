import { Fragment, useRef, useState, MouseEvent as RMouseEvent } from "react";
import { useAutosizeTextArea } from "@/hooks/useAutoSizeTextarea";
import { Transition, Dialog } from "@headlessui/react";
import { MailIcon } from "@/components/Icons";
import { verifyEmailAddress } from "@/utility/verifyEmail";

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

export function ContactForm() {
  const refTextArea = useRef<HTMLTextAreaElement>(null);
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  useAutosizeTextArea(refTextArea, formData.message, "128px");

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [errors, setErrors] = useState<ContactFormError>(initialError);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setErrors(initialError);
    setFormData(initialFormData);
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

  const handleSubmit = (e: RMouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setErrors(handleValidation());
    if (
      formData.name !== "" &&
      formData.email !== "" &&
      formData.subject !== "" &&
      formData.message
    ) {
      if (verifyEmailAddress(formData.email)) {
        // TODO: handle form submit
      } else {
        setErrors((prev) => ({ ...prev, email: "invalid" }));
      }
    }
  };

  const handleValueChange = (value: string, key: Fields) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors(initialError);
  };

  return (
    <>
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
                    className="mt-4 w-full rounded-full bg-teal-50 px-4 py-2 text-center text-lg font-semibold text-teal-900 transition-colors duration-150 hover:bg-teal-100"
                    onClick={handleSubmit}
                  >
                    Submit
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
