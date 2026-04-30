"use client";

import * as React from "react";
import {
  emptyContactForm,
  type ContactFormValues,
  validateContactForm,
} from "@/shared/lib/contact";

interface ToastState {
  message: string;
  tone: "success" | "error";
}

export function useContactForm() {
  const [values, setValues] = React.useState<ContactFormValues>(emptyContactForm);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [toast, setToast] = React.useState<ToastState | null>(null);

  React.useEffect(() => {
    if (!toast) return;

    const timeoutId = window.setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = event.target;

    setValues((current) => ({
      ...current,
      [id.replace("contact-", "")]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateContactForm(values);
    if (validationError) {
      setToast({ tone: "error", message: validationError });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "메일 발송 중 오류가 발생했습니다.");
      }

      setValues(emptyContactForm);
      setToast({
        tone: "success",
        message: "성공적으로 발신이 완료되었습니다.",
      });
    } catch (error) {
      setToast({
        tone: "error",
        message:
          error instanceof Error
            ? error.message
            : "메일 발송 중 오류가 발생했습니다.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    isSubmitting,
    toast,
    handleChange,
    handleSubmit,
  };
}
