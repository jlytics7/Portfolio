import type { ContactFormValues } from "@/types/content";

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

/**
 * Deliberately permissive. Over-strict email regexes reject valid addresses,
 * and the only real verification is sending a message that gets a reply.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const MESSAGE_MIN_LENGTH = 20;

export const EMPTY_CONTACT_FORM: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

/**
 * Validates the contact form. Returns an object keyed by field name; an empty
 * object means the form is valid.
 */
export function validateContactForm(
  values: ContactFormValues,
): ContactFormErrors {
  const errors: ContactFormErrors = {};

  const name = values.name.trim();
  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length < 2) {
    errors.name = "That looks a little short — please enter your full name.";
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address, e.g. name@example.com.";
  }

  if (!values.subject.trim()) {
    errors.subject = "Please add a subject.";
  }

  const message = values.message.trim();
  if (!message) {
    errors.message = "Please write a message.";
  } else if (message.length < MESSAGE_MIN_LENGTH) {
    errors.message = `Please write at least ${MESSAGE_MIN_LENGTH} characters so I can respond usefully.`;
  }

  return errors;
}

export function hasErrors(errors: ContactFormErrors) {
  return Object.keys(errors).length > 0;
}
