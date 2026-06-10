"use client";

import { useCallback } from "react";
import { toast as useToastPrimitive } from "sonner";

type ToastOptions = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

export function useToast() {
  const toast = useCallback(({ title, description, variant = "default" }: ToastOptions) => {
    if (variant === "destructive") {
      useToastPrimitive.error(title || "", { description });
    } else {
      useToastPrimitive.success(title || "", { description });
    }
  }, []);

  return { toast };
}