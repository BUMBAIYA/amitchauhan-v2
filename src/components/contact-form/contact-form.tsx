import { useState } from "react";

import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import CustomInput from "@/components/utility/custom-input";
import CustomTextarea from "@/components/utility/custom-textarea";
import ContactMailToast from "@/components/contact-form/contact-mail-toast";
import {
  FormikSubmitHandler,
  type FormiKInputFieldProps,
} from "@/utility/types";
import { type MailSentToastState } from "@/components/contact-form/contact-mail-toast";

export const mailValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email required"),
  name: Yup.string().required("Name required"),
  subject: Yup.string().required("Subject required"),
  message: Yup.string().required("Message required"),
});

export type ContactFormValues = Yup.InferType<typeof mailValidationSchema>;

const initialFormValues: ContactFormValues = {
  email: "",
  name: "",
  message: "",
  subject: "",
};

export default function ContactForm() {
  const [isSendingMail, setIsSendingMail] = useState(false);
  const [toastState, setToastState] = useState<MailSentToastState>({
    type: null,
    value: false,
  });

  const handleSubmit = async (
    values: Yup.InferType<typeof mailValidationSchema>,
    { resetForm }: FormikSubmitHandler,
  ) => {
    setIsSendingMail(true);
    try {
      const response = await fetch("/api/sendmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setToastState({ type: "PASS", value: true });
        resetForm();
      } else {
        setToastState({
          type: response.status === 429 ? "RATE_LIMIT" : "FAIL",
          value: true,
        });
      }
    } catch {
      setToastState({
        type: "FAIL",
        value: true,
      });
    }
    setIsSendingMail(false);
  };

  return (
    <>
      <Formik
        initialValues={initialFormValues}
        validationSchema={mailValidationSchema}
        onSubmit={handleSubmit}
        validateOnChange
      >
        {({ isValid }) => (
          <Form className="mt-6 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <div>
                <label
                  htmlFor="email"
                  className="inline font-medium text-background"
                >
                  Email
                </label>
              </div>
              <div className="relative">
                <Field name="email">
                  {({ field, meta }: FormiKInputFieldProps<string>) => (
                    <>
                      <CustomInput
                        id="email"
                        {...field}
                        type="text"
                        placeholder="Email"
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
              <div>
                <label
                  htmlFor="name"
                  className="inline font-medium text-background"
                >
                  Name
                </label>
              </div>
              <div className="relative">
                <Field name="name">
                  {({ field, meta }: FormiKInputFieldProps<string>) => (
                    <>
                      <CustomInput
                        id="name"
                        {...field}
                        type="text"
                        placeholder="Name"
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
              <div>
                <label
                  htmlFor="subject"
                  className="inline font-medium text-background"
                >
                  Subject
                </label>
              </div>
              <div className="relative">
                <Field name="subject">
                  {({ field, meta }: FormiKInputFieldProps<string>) => (
                    <>
                      <CustomInput
                        id="subject"
                        {...field}
                        type="text"
                        placeholder="Subject"
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
              <div>
                <label
                  htmlFor="message"
                  className="inline font-medium text-background"
                >
                  Message
                </label>
              </div>
              <div className="relative">
                <Field name="message">
                  {({ field, meta }: FormiKInputFieldProps<string>) => (
                    <>
                      <CustomTextarea
                        id="message"
                        {...field}
                        placeholder="Message"
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
              className="mt-4 w-full rounded-full bg-background px-4 py-3 text-center text-lg font-semibold text-accent transition-colors duration-150 hover:bg-background/90"
              disabled={!isValid || isSendingMail}
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
      {toastState && (
        <ContactMailToast toastState={toastState} showToast={setToastState} />
      )}
    </>
  );
}
