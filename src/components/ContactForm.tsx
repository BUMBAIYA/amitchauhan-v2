import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Field, Form, Formik, FieldInputProps, FieldMetaProps } from "formik";
import * as Yup from "yup";
import { CheckIcon, DangerIcon, MailIcon } from "@/components/Icons";
import { Toast } from "@/components/Toast";
import { classNames } from "@/utility/classNames";

export const mailValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email required"),
  name: Yup.string().required("Name required"),
  subject: Yup.string().required("Subject required"),
  message: Yup.string().required("Message required"),
});

const options = {
  root: null,
  rootMargin: "100px",
  threshold: 0.1,
};

type ToastType = "PASS" | "FAIL" | "RATE_LIMIT" | null;

export type FormiKInputFieldProps<Value> = {
  field: FieldInputProps<Value>;
  meta: FieldMetaProps<Value>;
};

type FormValues = Yup.InferType<typeof mailValidationSchema>;

export function ContactForm() {
  const initialFormValues: FormValues = {
    email: "",
    name: "",
    message: "",
    subject: "",
  };

  const refSendBtn = useRef<HTMLButtonElement>(null);

  const [isBtnVisible, setIsBtnVisible] = useState(false);

  const [isSendingMail, setIsSendingMail] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [showToast, setShowToast] = useState<{
    type: ToastType;
    value: boolean;
  }>({ type: null, value: false });

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsBtnVisible(!entry.isIntersecting);
  };

  const handleSubmit = async (
    values: Yup.InferType<typeof mailValidationSchema>,
  ) => {
    setIsSendingMail(true);
    try {
      const response = await fetch("/api/sendmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setShowToast({ type: "PASS", value: true });
        setIsOpenModal(false);
      } else {
        setShowToast({
          type: response.status === 429 ? "RATE_LIMIT" : "FAIL",
          value: true,
        });
      }
    } catch {
      setShowToast({
        type: "FAIL",
        value: true,
      });
    }
    setIsSendingMail(false);
  };

  useEffect(() => {
    const btn = refSendBtn.current;
    const observer = new IntersectionObserver(observerCallback, options);
    if (btn) observer.observe(btn);
    return () => {
      if (btn) observer.unobserve(btn);
    };
  }, [refSendBtn]);

  return (
    <>
      {showToast && (
        <Toast
          open={showToast.value}
          duration={3000}
          onClose={() => setShowToast((prev) => ({ ...prev, value: false }))}
          className={classNames(
            "fixed right-4 top-6 z-[9999] rounded-lg bg-teal-500 px-4 py-2 font-semibold text-white shadow-xl",
            showToast.type === "PASS"
              ? "bg-teal-500"
              : showToast.type === "RATE_LIMIT"
              ? "bg-yellow-500"
              : "bg-red-600",
          )}
        >
          <div className="flex w-full max-w-xs items-center gap-2">
            {showToast.type === "PASS" ? (
              <CheckIcon className="h-6 w-6 md:h-8 md:w-8" />
            ) : (
              <DangerIcon className="h-6 w-6 md:h-8 md:w-8" />
            )}

            <span className="text-sm md:text-xl">
              {showToast.type === "PASS"
                ? "Mail sent"
                : showToast.type === "RATE_LIMIT"
                ? "Only 5 mail per hour"
                : "Mail failed"}
            </span>
          </div>
        </Toast>
      )}

      {isBtnVisible && !isOpenModal && (
        <button
          aria-label="open send mail modal"
          type="button"
          className="fixed bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 p-2 text-white transition-colors duration-150 hover:bg-teal-500 sm:bottom-8 sm:right-8 sm:h-14 sm:w-14 sm:p-3 lg:h-16 lg:w-16"
          onClick={() => setIsOpenModal(true)}
        >
          <MailIcon />
        </button>
      )}

      <div className="text-center">
        <button
          ref={refSendBtn}
          className="inline-flex items-center gap-2 rounded-md bg-zinc-100 px-3 py-2 text-teal-600 transition-transform duration-150 focus-within:scale-[1.05] hover:scale-[1.05] hover:bg-white"
          onClick={() => setIsOpenModal(true)}
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
        <Dialog
          as="div"
          className="z-[999999]"
          onClose={() => setIsOpenModal(false)}
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
              <Dialog.Panel className="absolute m-4 w-[95%] max-w-xl overflow-y-auto rounded-2xl border-2 border-teal-100/20 bg-teal-600 px-6 py-8 shadow-lg shadow-teal-200/10 dark:bg-teal-700 md:px-10 md:py-16">
                <div className="flex items-center justify-between">
                  <Dialog.Title className="flex items-center gap-1 text-2xl font-semibold text-zinc-100 sm:gap-2 md:text-4xl">
                    <span className="inline-block h-8 w-8 sm:h-12 sm:w-12">
                      <MailIcon />
                    </span>
                    <span>Send Message</span>
                  </Dialog.Title>
                  <button
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-teal-600 bg-teal-50 p-2 text-sm text-teal-600 transition-transform hover:scale-[1.05] hover:bg-teal-100"
                    onClick={() => setIsOpenModal(false)}
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
                <Formik
                  initialValues={initialFormValues}
                  validationSchema={mailValidationSchema}
                  onSubmit={handleSubmit}
                  validateOnChange
                >
                  {({ isValid }) => (
                    <Form className="mt-6 flex flex-col gap-3">
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="email"
                          className="font-medium text-white"
                        >
                          Email
                        </label>
                        <div className="relative">
                          <Field name="email">
                            {({
                              field,
                              meta,
                            }: FormiKInputFieldProps<string>) => (
                              <>
                                <input
                                  id="email"
                                  {...field}
                                  type="text"
                                  placeholder="Email"
                                  className="w-full rounded-lg border-none bg-teal-50 font-semibold text-teal-800 placeholder:font-normal placeholder:text-zinc-400 focus-within:border-2 focus-within:border-teal-600 focus-within:ring-teal-600"
                                />
                                {Boolean(meta.touched && meta.error) && (
                                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-red-400 md:text-sm">
                                    {meta.error}
                                  </span>
                                )}
                              </>
                            )}
                          </Field>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="name"
                          className="font-medium text-white"
                        >
                          Name
                        </label>
                        <div className="relative">
                          <Field name="name">
                            {({
                              field,
                              meta,
                            }: FormiKInputFieldProps<string>) => (
                              <>
                                <input
                                  id="name"
                                  {...field}
                                  type="text"
                                  placeholder="Name"
                                  className="w-full rounded-lg border-none bg-teal-50 font-semibold text-teal-800 placeholder:font-normal placeholder:text-zinc-400 focus-within:border-2 focus-within:border-teal-600 focus-within:ring-teal-600"
                                />
                                {Boolean(meta.touched && meta.error) && (
                                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-red-400 md:text-sm">
                                    {meta.error}
                                  </span>
                                )}
                              </>
                            )}
                          </Field>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="subject"
                          className="font-medium text-white"
                        >
                          Subject
                        </label>
                        <div className="relative">
                          <Field name="subject">
                            {({
                              field,
                              meta,
                            }: FormiKInputFieldProps<string>) => (
                              <>
                                <input
                                  id="subject"
                                  {...field}
                                  type="text"
                                  placeholder="Subject"
                                  className="w-full rounded-lg border-none bg-teal-50 font-semibold text-teal-800 placeholder:font-normal placeholder:text-zinc-400 focus-within:border-2 focus-within:border-teal-600 focus-within:ring-teal-600"
                                />
                                {Boolean(meta.touched && meta.error) && (
                                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-red-400 md:text-sm">
                                    {meta.error}
                                  </span>
                                )}
                              </>
                            )}
                          </Field>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="message"
                          className="font-medium text-white"
                        >
                          Message
                        </label>
                        <div className="relative">
                          <Field name="message">
                            {({
                              field,
                              meta,
                            }: FormiKInputFieldProps<string>) => (
                              <>
                                <textarea
                                  id="message"
                                  {...field}
                                  placeholder="Message"
                                  className="w-full rounded-lg border-none bg-teal-50 font-semibold text-teal-800 placeholder:font-normal placeholder:text-zinc-400 focus-within:border-2 focus-within:border-teal-600 focus-within:ring-teal-600"
                                />
                                {Boolean(meta.touched && meta.error) && (
                                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-red-400 md:text-sm">
                                    {meta.error}
                                  </span>
                                )}
                              </>
                            )}
                          </Field>
                        </div>
                      </div>
                      <button
                        aria-label="open send mail modal"
                        type="submit"
                        className="mt-4 w-full rounded-full bg-teal-50 px-4 py-3 text-center text-lg font-semibold text-teal-900 transition-colors duration-150 hover:bg-teal-100"
                        disabled={!isValid}
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
                    </Form>
                  )}
                </Formik>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
